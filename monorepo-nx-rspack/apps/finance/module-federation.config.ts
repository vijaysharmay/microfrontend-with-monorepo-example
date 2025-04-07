import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'finance',
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
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
