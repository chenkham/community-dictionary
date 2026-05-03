import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dictionary — Tai Khamyang Hub',
  description: 'Search and browse the Tai Khamyang trilingual dictionary with words in Tai Khamyang, English, and Assamese.',
};

export default function DictionaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
