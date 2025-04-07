import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const engineeringRemoteUrl =
  process.env.ENGINEERING_REMOTE_URL || 'http://localhost:4203';

const hrRemoteUrl = process.env.HR_REMOTE_URL || 'http://localhost:4201';
const financeRemoteUrl =
  process.env.FINANCE_REMOTE_URL || 'http://localhost:4202';

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
  cacheDir: '../../node_modules/.vite/apps/shell',
  server: {
    port: 4200,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*', // ✅ add this
    },
  },
  preview: {
    port: 4200,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*', // ✅ add this
    },
  },
  plugins: [
    react(),
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        hr: {
          type: 'module',
          name: 'hr',
          entry: `${hrRemoteUrl}/assets/remoteEntry.js`,
          entryGlobalName: 'hr',
          shareScope: 'default',
        },
        finance: {
          type: 'module',
          name: 'finance',
          entry: `${financeRemoteUrl}/assets/remoteEntry.js`,
          entryGlobalName: 'finance',
          shareScope: 'default',
        },
        engineering: {
          type: 'module',
          name: 'engineering',
          entry: `${engineeringRemoteUrl}/assets/remoteEntry.js`,
          entryGlobalName: 'engineering',
          shareScope: 'default',
        },
      },
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
