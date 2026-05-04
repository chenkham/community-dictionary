import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorites --- Tai Khamyang Hub',
  description: 'Your saved favorite words from the Tai Khamyang dictionary.',
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
