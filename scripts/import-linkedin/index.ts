import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const linkedinDataPath = process.env.LINKEDIN_DATA_PATH || '../../linkedindata_basic';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env');
  process.exit(1);
}

// Initialize Supabase client
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Types
interface LinkedInProfile {
  'First Name': string;
  'Last Name': string;
  'Maiden Name': string;
  Address: string;
  'Birth Date': string;
  Headline: string;
  Summary: string;
  Industry: string;
  'Zip Code': string;
  'Geo Location': string;
  'Twitter Handles': string;
  Websites: string;
  'Instant Messengers': string;
}

interface LinkedInPosition {
  'Company Name': string;
  Title: string;
  Description: string;
  Location: string;
  'Started On': string;
  'Finished On': string;
}

interface LinkedInSkill {
  Name: string;
}

interface LinkedInCertification {
  Name: string;
  Url: string;
  Authority: string;
  'Started On': string;
  'Finished On': string;
  'License Number': string;
}

// Helper function to parse LinkedIn date (e.g., "Mar 2022", "Dec 2017")
function parseLinkedInDate(dateStr: string): Date | null {
  if (!dateStr || dateStr.trim() === '') return null;

  const months: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const parts = dateStr.trim().split(' ');
  if (parts.length < 2) return null;

  const month = months[parts[0]];
  const year = parseInt(parts[1]);

  if (isNaN(month) || isNaN(year)) return null;

  return new Date(year, month, 1);
}

// Helper function to format date for PostgreSQL
function formatDateForDb(date: Date | null): string | null {
  if (!date) return null;
  return date.toISOString().split('T')[0];
}

// Read and parse CSV file
function readCSV<T>(filename: string): T[] {
  const filePath = join(__dirname, linkedinDataPath, filename);

  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    return records as T[];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

// Import profile data
async function importProfile() {
  console.log('Importing profile...');

  const profiles = readCSV<LinkedInProfile>('Profile.csv');

  if (profiles.length === 0) {
    console.log('No profile data found');
    return null;
  }

  const profile = profiles[0];
  const fullName = `${profile['First Name']} ${profile['Last Name']}`.trim();

  // Check if profile already exists
  const { data: existing } = await supabase
    .from('candidate_profile')
    .select('id')
    .eq('full_name', fullName)
    .maybeSingle();

  if (existing) {
    console.log(`Profile already exists for ${fullName}`);
    return existing.id;
  }

  // Extract email from websites or use null if not found
  const websites = profile.Websites ? profile.Websites.split(',') : [];
  const email = websites.find(w => w.includes('@')) || null;

  // Create profile
  const { data, error } = await supabase
    .from('candidate_profile')
    .insert({
      full_name: fullName,
      email: email,
      headline: profile.Headline,
      location: profile['Geo Location'],
      about: profile.Summary,
      // LinkedIn URL would need to be extracted from profile data or configured separately
      linkedin_url: null
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error inserting profile:', error);
    return null;
  }

  console.log(`Profile imported: ${data.id}`);
  return data.id;
}

// Import experience data
async function importExperiences(profileId: string) {
  console.log('Importing experiences...');

  const positions = readCSV<LinkedInPosition>('Positions.csv');

  if (positions.length === 0) {
    console.log('No experience data found');
    return;
  }

  // Delete existing experiences for this profile
  await supabase
    .from('experiences')
    .delete()
    .eq('profile_id', profileId);

  // Insert new experiences
  const experiences = positions
    .filter(pos => pos['Company Name'] && pos.Title)
    .map(pos => ({
      profile_id: profileId,
      company: pos['Company Name'],
      title: pos.Title,
      description: pos.Description || null,
      location: pos.Location || null,
      started_on: formatDateForDb(parseLinkedInDate(pos['Started On'])) || null,
      finished_on: formatDateForDb(parseLinkedInDate(pos['Finished On']))
    }))
    .reverse(); // LinkedIn CSV is in reverse chronological order

  const { data, error } = await supabase
    .from('experiences')
    .insert(experiences)
    .select();

  if (error) {
    console.error('Error inserting experiences:', error);
    return;
  }

  console.log(`${data.length} experiences imported`);
}

// Import skills data
async function importSkills(profileId: string) {
  console.log('Importing skills...');

  const skills = readCSV<LinkedInSkill>('Skills.csv');

  if (skills.length === 0) {
    console.log('No skills data found');
    return;
  }

  // Delete existing skills for this profile
  await supabase
    .from('skills')
    .delete()
    .eq('profile_id', profileId);

  // Insert new skills
  const skillRecords = skills
    .filter(skill => skill.Name)
    .map(skill => ({
      profile_id: profileId,
      name: skill.Name,
      category: null,
      endorsement_count: 0
    }));

  const { data, error } = await supabase
    .from('skills')
    .insert(skillRecords)
    .select();

  if (error) {
    console.error('Error inserting skills:', error);
    return;
  }

  console.log(`${data.length} skills imported`);
}

// Import certifications (log only - no table exists yet)
function importCertifications() {
  console.log('Reading certifications...');

  const certifications = readCSV<LinkedInCertification>('Certifications.csv');

  if (certifications.length === 0) {
    console.log('No certification data found');
    return;
  }

  console.log(`\nFound ${certifications.length} certifications:`);
  certifications.forEach(cert => {
    console.log(`  - ${cert.Name} (${cert.Authority})`);
    console.log(`    Started: ${cert['Started On']}, Finished: ${cert['Finished On'] || 'Ongoing'}`);
    if (cert.Url) {
      console.log(`    URL: ${cert.Url}`);
    }
  });

  console.log('\nNote: Certifications table not created in schema yet.');
  console.log('Consider adding a certifications table if needed.');
}

// Main import function
async function main() {
  console.log('Starting LinkedIn data import...\n');

  try {
    // Import profile first
    const profileId = await importProfile();

    if (!profileId) {
      console.error('Failed to import profile. Aborting.');
      return;
    }

    console.log('');

    // Import related data
    await importExperiences(profileId);
    await importSkills(profileId);
    importCertifications();

    console.log('\nImport completed successfully!');
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

// Run the import
main();
