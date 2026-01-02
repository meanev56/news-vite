import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {user?.firstName}
      </h1>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Articles Read</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">48</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookmarks</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">12</CardContent>
        </Card>

        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Admin</CardTitle>
            </CardHeader>
            <CardContent>Publish Articles</CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default Dashboard;
