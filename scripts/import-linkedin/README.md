# LinkedIn CSV Import Script

This script imports LinkedIn profile data from CSV exports into a Supabase database.

## Overview

The script reads LinkedIn data export files (from `linkedindata_basic/` directory) and populates the following Supabase tables:
- `candidate_profile` - Basic profile information
- `experiences` - Work history and positions
- `skills` - Professional skills
- Certifications (logged but not imported - table not in schema yet)

## Prerequisites

1. **Supabase Project**: Have a Supabase project set up with the database schema applied
2. **LinkedIn Data Export**: Download your LinkedIn data as CSV files and place them in the `linkedindata_basic/` directory
3. **Node.js**: Node.js 18+ installed

## Installation

1. Navigate to the script directory:
```bash
cd scripts/import-linkedin
```

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
LINKEDIN_DATA_PATH=../../linkedindata_basic
```

**Important**: Use the `service_role` key (not the `anon` key) to bypass RLS policies during import.

### Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Project Settings > API
3. Copy the Project URL
4. Copy the `service_role` secret (found under "Project API keys")

## LinkedIn Data Setup

Place your LinkedIn CSV export files in the `linkedindata_basic/` directory (or configure the path in `.env`).

Required files:
- `Profile.csv` - Basic profile information
- `Positions.csv` - Work experience
- `Skills.csv` - Professional skills
- `Certifications.csv` - Certifications (optional - logged only)

## Usage

### Build and run:
```bash
npm run dev
```

This will:
1. Compile the TypeScript code
2. Import profile data
3. Import work experiences
4. Import skills
5. Log certifications (not inserted - no table yet)

### Build only:
```bash
npm run build
```

### Run after build:
```bash
npm start
```

## Data Mapping

### Profile
- LinkedIn CSV fields → `candidate_profile` table
- First Name + Last Name → `full_name`
- Headline → `headline`
- Geo Location → `location`
- Summary → `about`
- Websites → `email` (first email found)
- LinkedIn URL → `linkedin_url`

### Experiences
- LinkedIn CSV fields → `experiences` table
- Company Name → `company`
- Title → `title`
- Description → `description`
- Location → `location`
- Started On → `started_on`
- Finished On → `finished_on` (null if current)

### Skills
- LinkedIn CSV fields → `skills` table
- Name → `name`
- Category → `category` (null)
- Endorsements → `endorsement_count` (0 - not exported in basic CSV)

### Certifications
Currently logged to console only. The schema does not include a certifications table.

## Important Notes

### Duplicate Prevention
- The script checks if a profile with the same `full_name` already exists
- If found, it uses the existing profile ID
- Experiences and skills are deleted and re-imported for the profile

### Date Parsing
- LinkedIn dates like "Mar 2022" are parsed to the first day of the month
- Invalid dates default to current date for `started_on`
- Null `finished_on` indicates current position

### RLS Policies
- The script uses the `service_role` key to bypass Row Level Security
- Do not commit `.env` with real credentials

## Troubleshooting

### Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set
- Ensure `.env` file exists with proper values
- Check that variables are not commented out

### Error: No profile data found
- Verify LinkedIn CSV files are in the correct directory
- Check that `Profile.csv` exists and has data
- Ensure `LINKEDIN_DATA_PATH` in `.env` is correct

### Error: RLS policy violation
- Ensure you're using `SUPABASE_SERVICE_KEY` (not `SUPABASE_ANON_KEY`)
- The `service_role` key bypasses RLS policies

### Profile already exists
- The script will reuse the existing profile
- Experiences and skills will be deleted and re-imported

## Development

### TypeScript Compilation
The script uses TypeScript for type safety. Compilation output goes to `dist/`.

### Schema Changes
If you modify the database schema, update the TypeScript interfaces in `index.ts`:
- `LinkedInProfile`
- `LinkedInPosition`
- `LinkedInSkill`
- `LinkedInCertification`

## Security

- Never commit `.env` files to version control
- The `.env.example` file shows required variables without values
- Service role keys have full database access - keep them secret
- Consider using environment-specific configs for dev/prod

## Future Enhancements

Potential improvements:
- Add certifications table to schema and import
- Support for Education.csv import
- Import endorsements if available in data export
- Dry-run mode to preview changes
- Incremental updates instead of full re-import
- Better error handling and rollback on failure
- Support for multiple profiles
