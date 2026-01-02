import { useEffect, useState } from 'react';
import type { Bookmark } from '@/services/bookmarks';
import { fetchBookmarks } from '@/services/bookmarks';

export const useBookmarks = () => {
  const [data, setData] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};
