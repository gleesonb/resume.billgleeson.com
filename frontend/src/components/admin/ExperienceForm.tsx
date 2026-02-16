import { useState } from 'react';
import { Save, Loader2, Plus, Trash2, Edit } from 'lucide-react';
import { Experience } from '../../types';

interface ExperienceFormProps {
  experiences: Experience[];
  onSave: (id: string, data: Partial<Experience>) => Promise<void>;
  onCreate: (data: Partial<Experience>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const ExperienceForm = ({ experiences, onSave, onCreate, onDelete }: ExperienceFormProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company_name: '',
    title: '',
    description: '',
    location: '',
    started_on: '',
    finished_on: '',
    is_current: false,
    why_joined: '',
    why_left: '',
    actual_contributions: '',
    proudest_achievement: '',
    challenges_faced: '',
    lessons_learned: '',
  });

  const resetForm = () => {
    setFormData({
      company_name: '',
      title: '',
      description: '',
      location: '',
      started_on: '',
      finished_on: '',
      is_current: false,
      why_joined: '',
      why_left: '',
      actual_contributions: '',
      proudest_achievement: '',
      challenges_faced: '',
      lessons_learned: '',
    });
    setEditingId(null);
    setIsCreating(false);
  };

  const handleEdit = (experience: Experience) => {
    setFormData(experience);
    setEditingId(experience.id);
    setIsCreating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isCreating) {
        await onCreate(formData);
      } else if (editingId) {
        await onSave(editingId, formData);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save experience:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      await onDelete(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-playfair font-bold text-white">Manage Experience</h2>
        {!isCreating && !editingId && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-3 bg-accent-teal text-white rounded-lg hover:bg-accent-teal/90 transition-colors"
          >
            <Plus size={20} />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {/* Form */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 bg-card border border-border rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-white font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors"
                placeholder="Company Inc."
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

            {/* Is Current */}
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_current"
                  checked={formData.is_current}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-border bg-background text-accent-teal focus:ring-accent-teal focus:ring-offset-0"
                />
                <span className="text-white font-medium">Current Position</span>
              </label>
            </div>

            {/* Started On */}
            <div>
              <label className="block text-white font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="started_on"
                value={formData.started_on}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent-teal transition-colors"
                required
              />
            </div>

            {/* Finished On */}
            {!formData.is_current && (
              <div>
                <label className="block text-white font-medium mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="finished_on"
                  value={formData.finished_on || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent-teal transition-colors"
                />
              </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-white font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors resize-none"
                placeholder="Describe your role and responsibilities..."
                required
              />
            </div>

            {/* AI Context Fields */}
            <div className="md:col-span-2 border-t border-border pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">AI Context (Optional)</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-text-secondary font-medium mb-2">
                    Why I Joined
                  </label>
                  <textarea
                    name="why_joined"
                    value={formData.why_joined || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors resize-none"
                    placeholder="What attracted you to this role?"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary font-medium mb-2">
                    What I Actually Did
                  </label>
                  <textarea
                    name="actual_contributions"
                    value={formData.actual_contributions || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors resize-none"
                    placeholder="Your real contributions beyond the job description"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary font-medium mb-2">
                    Proudest Achievement
                  </label>
                  <textarea
                    name="proudest_achievement"
                    value={formData.proudest_achievement || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors resize-none"
                    placeholder="What are you most proud of?"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary font-medium mb-2">
                    Challenges Faced
                  </label>
                  <textarea
                    name="challenges_faced"
                    value={formData.challenges_faced || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors resize-none"
                    placeholder="What challenges did you overcome?"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary font-medium mb-2">
                    Lessons Learned
                  </label>
                  <textarea
                    name="lessons_learned"
                    value={formData.lessons_learned || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors resize-none"
                    placeholder="What did you learn from this experience?"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary font-medium mb-2">
                    Why I Left
                  </label>
                  <textarea
                    name="why_left"
                    value={formData.why_left || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-teal transition-colors resize-none"
                    placeholder="Why did you move on?"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-8">
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
                  <span>{isCreating ? 'Create' : 'Save'} Experience</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-card border border-border text-white rounded-lg hover:bg-background transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="bg-card border border-border rounded-lg p-6 hover:border-accent-teal/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white font-playfair">
                    {experience.title}
                  </h3>
                  {experience.is_current && (
                    <span className="px-3 py-1 bg-accent-teal/10 text-accent-teal text-xs font-medium rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-accent-amber font-medium mb-2">{experience.company_name}</p>
                <p className="text-text-secondary text-sm">{experience.location}</p>
                <p className="text-text-secondary text-sm mt-2">
                  {new Date(experience.started_on).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                  {experience.finished_on
                    ? new Date(experience.finished_on).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'Present'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(experience)}
                  className="p-2 text-text-secondary hover:text-accent-teal hover:bg-accent-teal/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && !isCreating && (
          <div className="text-center py-12 text-text-secondary">
            <p>No experiences added yet. Click "Add Experience" to create your first one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
