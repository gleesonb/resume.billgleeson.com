import { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, User, Briefcase, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-2xl font-playfair font-bold text-white mb-8">
            Admin Panel
          </h1>

          <nav className="space-y-2">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-accent-teal/10 rounded-lg transition-colors"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/profile"
              className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-accent-teal/10 rounded-lg transition-colors"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>

            <Link
              to="/admin/experience"
              className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-accent-teal/10 rounded-lg transition-colors"
            >
              <Briefcase size={20} />
              <span>Experience</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-accent-teal/10 rounded-lg transition-colors mt-8"
            >
              <LogOut size={20} />
              <span>Back to Site</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
