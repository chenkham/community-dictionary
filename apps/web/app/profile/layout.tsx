import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile — Tai Khamyang Hub',
  description: 'Your contributor profile on the Tai Khamyang Hub.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
