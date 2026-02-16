import { useAdmin } from '../hooks/useAdmin';
import { ProfileForm } from '../components/admin';
import { Loader2 } from 'lucide-react';

const AdminProfile = () => {
  const { profile, loading, error, updateProfile } = useAdmin();

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
        <p className="font-semibold mb-2">Error loading profile</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return <ProfileForm profile={profile} onSave={updateProfile} />;
};

export default AdminProfile;
