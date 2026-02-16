import { useAdmin } from '../hooks/useAdmin';
import { AdminPage } from '../components/admin';
import { Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { profile, experiences, loading, error } = useAdmin();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-accent-teal" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-6">
        <p className="font-semibold mb-2">Error loading admin data</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <AdminPage
      profile={profile}
      experienceCount={experiences.length}
      skillsCount={0} // TODO: Implement skills count when skills are managed
    />
  );
};

export default AdminDashboard;
