export interface Bookmark {
  id: string;
  title: string;
  slug: string;
}

export const fetchBookmarks = async (): Promise<Bookmark[]> => {
  return [
    { id: '1', title: 'Naira vs Dollar Update', slug: 'naira-dollar' },
    { id: '2', title: 'CBN Policy Explained', slug: 'cbn-policy' },
  ];
};
