import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r hidden md:block p-4">
        <nav className="space-y-2">
          <Link to="/dashboard" className="block font-medium">Overview</Link>
          <Link to="/dashboard/bookmarks">Bookmarks</Link>
          <Link to="/dashboard/profile">Profile</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
