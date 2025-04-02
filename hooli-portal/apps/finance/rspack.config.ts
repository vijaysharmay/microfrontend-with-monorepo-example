import { composePlugins, withNx, withReact } from '@nx/rspack';

// export default composePlugins(
//   withNx(),
//   withReact(),
//   withModuleFederation(config, { dts: false })
// );

import { container } from '@rspack/core';

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

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'finance',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/remote-entry.ts',
        './Home': './src/app/pages/home.tsx',
        './Reports': './src/app/pages/reports.tsx',
        './Notifications': './src/app/pages/notifications-center.tsx',
        './NewVendor': './src/app/pages/accounting/new-vendor.tsx',
        './ReceivablesInvoices':
          './src/app/pages/accounting/receivables-invoices.tsx',
        './ReceivablesKPIs': './src/app/pages/accounting/receivables-kpis.tsx',
        './ReviewPurchaseOrders':
          './src/app/pages/accounting/review-purchase-orders.tsx',
        './InventoryManagement': './src/app/pages/inventory-management.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
      },
      library: {
        type: 'module',
      },
    })
  );

  return config;
});
