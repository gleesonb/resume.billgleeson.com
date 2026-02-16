import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { CandidateProfile } from '../../types';

interface ProfileFormProps {
  profile: CandidateProfile | null;
  onSave: (data: Partial<CandidateProfile>) => Promise<void>;
}

const ProfileForm = ({ profile, onSave }: ProfileFormProps) => {
  const [formData, setFormData] = useState<Partial<CandidateProfile>>({
    name: '',
    email: '',
    title: '',
    headline: '',
    summary: '',
    location: '',
    github_url: '',
    linkedin_url: '',
    availability_status: 'open',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await onSave(formData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-playfair font-bold text-white">Edit Profile</h2>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-accent-teal text-white rounded-lg hover:bg-accent-teal/90 disabled:opacity-50 transition-colors"
        >
          {isSaving ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-500 rounded-lg">
          Profile saved successfully!
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg">
          Failed to save profile. Please try again.
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-8 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-white font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors"
            placeholder="Bill Gleeson"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors"
            placeholder="bill@example.com"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-white font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors"
            placeholder="Senior Software Engineer"
            required
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block text-white font-medium mb-2">
            Headline
          </label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors"
            placeholder="Building innovative solutions with modern tech"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-white font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors"
            placeholder="San Francisco, CA"
            required
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-white font-medium mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="github_url"
            value={formData.github_url || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors"
            placeholder="https://github.com/billgleeson"
          />
        </div>

        {/* LinkedIn URL */}
        <div>
          <label className="block text-white font-medium mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin_url"
            value={formData.linkedin_url || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors"
            placeholder="https://linkedin.com/in/billgleeson"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-white font-medium mb-2">
            Summary
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={8}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors resize-none"
            placeholder="Tell us about yourself..."
            required
          />
        </div>

        {/* Availability Status */}
        <div>
          <label className="block text-white font-medium mb-2">
            Availability Status
          </label>
          <select
            name="availability_status"
            value={formData.availability_status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent-teal transition-colors"
          >
            <option value="open">Open to opportunities</option>
            <option value="busy">Not looking</option>
            <option value="listening">Listening to the right offer</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
