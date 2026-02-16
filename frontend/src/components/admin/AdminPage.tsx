import { Link } from 'react-router-dom';
import { User, Briefcase, BarChart3, ArrowRight } from 'lucide-react';

interface AdminPageProps {
  profile: {
    name: string;
    title: string;
  } | null;
  experienceCount: number;
  skillsCount: number;
}

const AdminPage = ({ profile, experienceCount, skillsCount }: AdminPageProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-white mb-2">
          Welcome, {profile?.name || 'Admin'}
        </h1>
        <p className="text-text-secondary">Manage your portfolio content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent-teal/10 rounded-lg flex items-center justify-center">
              <User className="text-accent-teal" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">1</h3>
          <p className="text-text-secondary text-sm">Profile</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent-amber/10 rounded-lg flex items-center justify-center">
              <Briefcase className="text-accent-amber" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{experienceCount}</h3>
          <p className="text-text-secondary text-sm">Experiences</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent-teal/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-accent-teal" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{skillsCount}</h3>
          <p className="text-text-secondary text-sm">Skills</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-playfair font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/profile"
            className="bg-card border border-border rounded-lg p-6 hover:border-accent-teal/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Edit Profile</h3>
                <p className="text-text-secondary text-sm">Update your personal information, title, and summary</p>
              </div>
              <ArrowRight className="text-text-secondary group-hover:text-accent-teal group-hover:translate-x-1 transition-all" size={20} />
            </div>
          </Link>

          <Link
            to="/admin/experience"
            className="bg-card border border-border rounded-lg p-6 hover:border-accent-teal/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Manage Experience</h3>
                <p className="text-text-secondary text-sm">Add, edit, or remove work experiences</p>
              </div>
              <ArrowRight className="text-text-secondary group-hover:text-accent-teal group-hover:translate-x-1 transition-all" size={20} />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-playfair font-bold text-white mb-4">Getting Started</h2>
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-accent-teal text-sm font-bold">1</span>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Complete your profile</h4>
              <p className="text-text-secondary text-sm">Add your personal information, title, and professional summary.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent-amber/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-accent-amber text-sm font-bold">2</span>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Add your work experience</h4>
              <p className="text-text-secondary text-sm">Include your past roles, responsibilities, and achievements.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-accent-teal text-sm font-bold">3</span>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Enrich with AI context</h4>
              <p className="text-text-secondary text-sm">Add insights about why you joined, what you actually did, and what you learned.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
