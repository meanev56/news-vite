import { useBookmarks } from '@/hooks/useBookmarks';

const Bookmarks = () => {
  const { data, loading } = useBookmarks();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Bookmarks</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded shadow">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
