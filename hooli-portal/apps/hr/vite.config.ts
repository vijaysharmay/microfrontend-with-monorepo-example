import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@hooli-monorepo/uicomponents': path.resolve(
        __dirname,
        '../../libs/uicomponents/src/index.ts'
      ),
    },
  },
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/hr',
  server: {
    port: 4201,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*', // ✅ add this
    },
  },
  preview: {
    port: 4201,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*', // ✅ add this
    },
  },
  plugins: [
    react(),
    federation({
      name: 'hr',
      filename: 'assets/remoteEntry.js',
      exposes: {
        './Home': './src/app/pages/home.tsx',
        './Reports': './src/app/pages/reports.tsx',
        './Notifications': './src/app/pages/notifications-center.tsx',
        './NewJobRequisition':
          './src/app/pages/job-requisition/new-job-requisition.tsx',
        './ViewJobRequisitions':
          './src/app/pages/job-requisition/view-job-requisitions.tsx',
        './AnnualReviews':
          './src/app/pages/rewards-and-recognition/annual-reviews.tsx',
        './SharePerspectives':
          './src/app/pages/rewards-and-recognition/share-perspectives.tsx',
      },
      manifest: true,
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: 'esnext',
    modulePreload: false,
    minify: true,
    rollupOptions: {
      output: {
        format: 'esm',
      },
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
});
