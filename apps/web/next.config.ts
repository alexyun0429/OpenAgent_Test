import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Monorepo: trace files from the repo root so the standalone build
  // resolves workspace dependencies and manifests correctly.
  outputFileTracingRoot: path.join(__dirname, '../..'),
};

export default nextConfig;
