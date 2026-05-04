import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn Tai Khamyang --- TK Hub',
  description: 'Learn basic Tai Khamyang words and phrases --- greetings, numbers, family, food, nature, and religion.',
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
