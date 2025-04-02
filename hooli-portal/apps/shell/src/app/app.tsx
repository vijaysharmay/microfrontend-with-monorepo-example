import {
  Alert20Filled,
  Box20Filled,
  ChartPerson20Filled,
  CollectionsAdd20Filled,
  Home20Filled,
  MoneyHand20Filled,
  PersonMoney20Filled,
  Reward20Filled,
} from '@fluentui/react-icons';
import { SideNav, SideNavItem } from '@hooli-portal/uicomponents';
import { lazy } from 'react';
import { Route, Switch } from 'wouter';

const HrHome = lazy(() => import('hr/Home'));
const HrReports = lazy(() => import('hr/Reports'));
const HrNotifications = lazy(() => import('hr/Notifications'));
const HrNewJobRequisition = lazy(() => import('hr/NewJobRequisition'));
const HrViewJobRequisitions = lazy(() => import('hr/ViewJobRequisitions'));
const HrAnnualReviews = lazy(() => import('hr/AnnualReviews'));
const HrSharePerspectives = lazy(() => import('hr/SharePerspectives'));

const FinanceHome = lazy(() => import('finance/Home'));
const FinanceReports = lazy(() => import('finance/Reports'));
const FinanceNotifications = lazy(() => import('finance/Notifications'));
const FinanceReceivablesInvoices = lazy(
  () => import('finance/ReceivablesInvoices')
);
const FinanceReceivablesKPIs = lazy(() => import('finance/ReceivablesKPIs'));
const FinanceReviewPurchaseOrders = lazy(
  () => import('finance/ReviewPurchaseOrders')
);
const FinanceNewVendor = lazy(() => import('finance/NewVendor'));
const FinanceInventoryManagement = lazy(
  () => import('finance/InventoryManagement')
);

export function App() {
  const navItems: SideNavItem[] = [
    { label: 'Home', icon: <Home20Filled />, href: '/' },
    {
      sectionLabel: 'Hooli HR',
      children: [
        { label: 'Home', icon: <Home20Filled />, href: '/hr/home' },
        {
          label: 'Reports',
          icon: <ChartPerson20Filled />,
          href: '/hr/reports',
        },
        {
          label: 'Notifications',
          icon: <Alert20Filled />,
          href: '/hr/notifications',
        },
        {
          categoryLabel: 'Manage Open Positions',
          icon: <CollectionsAdd20Filled />,
          children: [
            { label: 'Create Job Requisition', href: '/hr/requisition/new' },
            { label: 'View Job Requisitions', href: '/hr/requisition/view' },
          ],
        },
        {
          categoryLabel: 'Rewards & Recognition',
          icon: <Reward20Filled />,
          children: [
            { label: 'Annual Reviews', href: '/hr/rewards/review' },
            { label: 'Share Perspectives', href: '/hr/rewards/share' },
          ],
        },
      ],
    },
    {
      sectionLabel: 'Hooli Finance',
      children: [
        { label: 'Home', icon: <Home20Filled />, href: '/finance/home' },
        {
          label: 'Reports',
          icon: <ChartPerson20Filled />,
          href: '/finance/reports',
        },
        {
          label: 'Notifications',
          icon: <Alert20Filled />,
          href: '/finance/notifications',
        },
        {
          categoryLabel: 'Accounts Receivable',
          icon: <MoneyHand20Filled />,
          children: [
            { label: 'KPIs', href: '/finance/receivables/kpis' },
            { label: 'Invoices', href: '/finance/receivables/invoices' },
          ],
        },
        {
          categoryLabel: 'Accounts Payable',
          icon: <PersonMoney20Filled />,
          children: [
            {
              label: 'Review Purchase Orders',
              href: '/finance/payables/review',
            },
            { label: 'Add Vendor', href: '/finance/payables/vendor-new' },
          ],
        },
        {
          label: 'Inventory Management',
          icon: <Box20Filled />,
          href: '/finance/inventory',
        },
      ],
    },
  ];
  return (
    <SideNav heading="Hooli Portal" navItems={navItems}>
      <Switch>
        <Route path="/">
          <div>This is the shell home page</div>
        </Route>
        <Route path="/hr/home" component={HrHome} />
        <Route path="/hr/reports" component={HrReports} />
        <Route path="/hr/notifications" component={HrNotifications} />
        <Route path="/hr/requisition/new" component={HrNewJobRequisition} />
        <Route path="/hr/requisition/view" component={HrViewJobRequisitions} />
        <Route path="/hr/rewards/review" component={HrAnnualReviews} />
        <Route path="/hr/rewards/share" component={HrSharePerspectives} />

        {/* Finance Routes */}
        <Route path="/finance/home" component={FinanceHome} />
        <Route path="/finance/reports" component={FinanceReports} />
        <Route path="/finance/notifications" component={FinanceNotifications} />
        <Route
          path="/finance/receivables/invoices"
          component={FinanceReceivablesInvoices}
        />
        <Route
          path="/finance/receivables/kpis"
          component={FinanceReceivablesKPIs}
        />
        <Route
          path="/finance/payables/review"
          component={FinanceReviewPurchaseOrders}
        />
        <Route
          path="/finance/payables/vendor-new"
          component={FinanceNewVendor}
        />
        <Route
          path="/finance/inventory"
          component={FinanceInventoryManagement}
        />
      </Switch>
    </SideNav>
  );
}

export default App;
