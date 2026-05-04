/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 'standalone' avoids static export of the legacy /404 and /500 pages
  // (which crash in this monorepo due to a styled-jsx React version
  // mismatch — root has React 18.2 while next has 18.3 hoisted locally).
  output: 'standalone',
};

module.exports = nextConfig;
