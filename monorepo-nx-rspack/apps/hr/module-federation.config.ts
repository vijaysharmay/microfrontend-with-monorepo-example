import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'hr',
  exposes: {
    './Module': './src/remote-entry.ts',
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
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
