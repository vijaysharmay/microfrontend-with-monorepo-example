// import { withModuleFederation } from '@nx/module-federation/rspack';
import { composePlugins, withNx, withReact } from '@nx/rspack';

// import baseConfig from './module-federation.config';

// const config = {
//   ...baseConfig,
// };

// export default composePlugins(
//   withNx(),
//   withReact(),
//   withModuleFederation(config, { dts: false })
// );

import { container, rspack, RspackOptions } from '@rspack/core';

const { ModuleFederationPlugin } = container;

export default composePlugins(
  withNx(),
  withReact(),
  async (config: RspackOptions) => {
    config.resolve ??= {};
    config.resolve.alias ??= {};

    config.experiments ??= {};
    config.experiments.outputModule = true; // 🔥 must be set

    // config.output ??= {};
    // config.output.module = true; // ✅ ESM output
    // config.output.library = {
    //   type: 'module', // ✅ Required for native module federation
    // };

    config.plugins ??= [];

    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'finance',
        filename: 'remoteEntry.js',
        library: { type: 'module' },
        exposes: {
          './Module': './src/remote-entry.ts',
          './Home': './src/app/pages/home.tsx',
          './Reports': './src/app/pages/reports.tsx',
          './Notifications': './src/app/pages/notifications-center.tsx',
          './NewVendor': './src/app/pages/accounting/new-vendor.tsx',
          './ReceivablesInvoices':
            './src/app/pages/accounting/receivables-invoices.tsx',
          './ReceivablesKPIs':
            './src/app/pages/accounting/receivables-kpis.tsx',
          './ReviewPurchaseOrders':
            './src/app/pages/accounting/review-purchase-orders.tsx',
          './InventoryManagement': './src/app/pages/inventory-management.tsx',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18.3.1' },
          'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        },
      })
    );

    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof rspack.HtmlRspackPlugin)
    );

    config.plugins.push(
      new rspack.HtmlRspackPlugin({
        scriptLoading: 'module',
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main', 'runtime'],
      })
    );

    return config;
  }
);
