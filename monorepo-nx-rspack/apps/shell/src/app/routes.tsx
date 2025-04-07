import { lazy, ReactNode, Suspense } from 'react';
import { Route } from 'wouter';

export type RemoteRoute = {
  path: string;
  label: string;
  icon?: ReactNode;
  category?: string;
  section?: string;
  import: () => Promise<{ default: React.ComponentType<any> }>;
};

export const remoteRoutes: RemoteRoute[] = [
  // HR routes
  {
    path: '/hr/home',
    label: 'Home',
    import: () => import('hr/Home'),
  },
  {
    path: '/hr/reports',
    label: 'Reports',
    import: () => import('hr/Reports'),
  },
  {
    path: '/hr/notifications',
    label: 'Notifications',
    import: () => import('hr/Notifications'),
  },
  {
    path: '/hr/requisition/new',
    label: 'Create Job Requisition',
    section: 'Talent Management',
    category: 'Manage Open Positions',
    import: () => import('hr/NewJobRequisition'),
  },
  {
    path: '/hr/requisition/view',
    label: 'View Job Requisitions',
    section: 'Talent Management',
    category: 'Manage Open Positions',
    import: () => import('hr/ViewJobRequisitions'),
  },
  {
    path: '/hr/rewards/review',
    label: 'Annual Reviews',
    section: 'Talent Management',
    category: 'Rewards & Recognition',
    import: () => import('hr/AnnualReviews'),
  },
  {
    path: '/hr/rewards/share',
    label: 'Share Perspectives',
    section: 'Talent Management',
    category: 'Rewards & Recognition',
    import: () => import('hr/SharePerspectives'),
  },

  // Finance routes
  {
    path: '/finance/home',
    label: 'Home',
    import: () => import('finance/Home'),
  },
  {
    path: '/finance/reports',
    label: 'Reports',
    import: () => import('finance/Reports'),
  },
  {
    path: '/finance/notifications',
    label: 'Notifications',
    import: () => import('finance/Notifications'),
  },
  {
    path: '/finance/receivables/invoices',
    label: 'Invoices',
    section: 'Accounting',
    category: 'Accounts Receivable',
    import: () => import('finance/ReceivablesInvoices'),
  },
  {
    path: '/finance/receivables/kpis',
    label: 'KPIs',
    section: 'Accounting',
    category: 'Accounts Receivable',
    import: () => import('finance/ReceivablesKPIs'),
  },
  {
    path: '/finance/payables/review',
    label: 'Review Purchase Orders',
    section: 'Accounting',
    category: 'Accounts Payable',
    import: () => import('finance/ReviewPurchaseOrders'),
  },
  {
    path: '/finance/payables/vendor-new',
    label: 'Add Vendor',
    section: 'Accounting',
    category: 'Accounts Payable',
    import: () => import('finance/NewVendor'),
  },
  {
    path: '/finance/inventory',
    label: 'Inventory Management',
    section: 'Logistics',
    import: () => import('finance/InventoryManagement'),
  },
  {
    path: '/engineering/home',
    label: 'Home',
    import: () => import('engineering/Home'),
  },
  {
    path: '/engineering/reports',
    label: 'Reports',
    import: () => import('engineering/Reports'),
  },
  {
    path: '/engineering/notifications',
    label: 'Notifications',
    import: () => import('engineering/Notifications'),
  },
];

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading remote...</div>}>
      {remoteRoutes.map(({ path, import: importFn }) => {
        const LazyComponent = lazy(async () => {
          const mod = await importFn();
          console.log(`[Remote Load] ${path}`, mod);
          if (!mod?.default) {
            throw new Error(`No default export in ${path}`);
          }

          const name = mod.default?.name || 'anonymous';
          console.log(`[Remote Component] default export name: ${name}`);
          return mod;
        });
        return (
          <Route
            key={path}
            path={path}
            component={() => {
              console.log(`[Wouter Match] Rendering ${path}`);
              return (
                <Suspense fallback={<div>Loading remote...</div>}>
                  <LazyComponent />
                </Suspense>
              );
            }}
          />
        );
      })}
    </Suspense>
  );
}
