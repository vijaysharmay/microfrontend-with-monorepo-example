import { composePlugins, withNx, withReact } from '@nx/rspack';

// export default composePlugins(
//   withNx(),
//   withReact(),
//   withModuleFederation(config, { dts: false })
// );

import { container, rspack } from '@rspack/core';

const { ModuleFederationPlugin } = container;

export default composePlugins(withNx(), withReact(), async (config) => {
  config.resolve ??= {};
  config.resolve.alias ??= {};

  config.experiments ??= {};
  config.experiments.outputModule = true; // 🔥 must be set

  config.output ??= {};
  config.output.module = true; // ✅ ESM output
  config.output.library = {
    type: 'module', // ✅ Required for native module federation
  };

  config.plugins ??= [];

  config.plugins = config.plugins.filter(
    (plugin) => !(plugin instanceof rspack.HtmlRspackPlugin)
  );

  config.plugins.push(
    new rspack.HtmlRspackPlugin({
      scriptLoading: 'module',
      template: './src/index.html',
      filename: 'index.html',
    })
  );

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'hr',
      filename: 'remoteEntry.js',
      library: { type: 'module' },
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
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
      },
    })
  );

  return config;
});
