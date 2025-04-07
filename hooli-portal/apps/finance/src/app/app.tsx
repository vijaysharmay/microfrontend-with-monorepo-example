import {
  Alert20Filled,
  Box20Filled,
  ChartPerson20Filled,
  Home20Filled,
  MoneyHand20Filled,
  PersonMoney20Filled,
} from '@fluentui/react-icons';
import { SideNav, SideNavItem } from '@hooli-portal/uicomponents';
import { Route, Switch } from 'wouter';
import NewVendor from './pages/accounting/new-vendor';
import ReceivablesInvoices from './pages/accounting/receivables-invoices';
import ReceivablesKPIs from './pages/accounting/receivables-kpis';
import ReviewPurchaseOrders from './pages/accounting/review-purchase-orders';
import Home from './pages/home';
import InventoryManagement from './pages/inventory-management';
import NotificationsCenter from './pages/notifications-center';
import Reports from './pages/reports';

export function App() {
  const navItems: SideNavItem[] = [
    { label: 'Home', icon: <Home20Filled />, href: '/' },
    { label: 'Reports', icon: <ChartPerson20Filled />, href: '/reports' },
    { label: 'Notifications', icon: <Alert20Filled />, href: '/notifications' },
    {
      sectionLabel: 'Accounting',
      children: [
        {
          categoryLabel: 'Accounts Receivable',
          icon: <MoneyHand20Filled />,
          children: [
            { label: 'KPIs', href: '/receivables/kpis' },
            { label: 'Invoices', href: '/receivables/invoices' },
          ],
        },
        {
          categoryLabel: 'Accounts Payable',
          icon: <PersonMoney20Filled />,
          children: [
            { label: 'Review Purchase Orders', href: '/payables/review' },
            { label: 'Add Vendor', href: '/payables/vendor-new' },
          ],
        },
      ],
    },
    {
      label: 'Inventory Management',
      icon: <Box20Filled />,
      href: '/inventory',
    },
  ];
  return (
    <SideNav heading="Hooli Finance" navItems={navItems}>
      <Switch>
        <Route path={'/'} component={Home} />
        <Route path={`/reports`} component={Reports} />
        <Route path={`/notifications`} component={NotificationsCenter} />
        <Route path={`/receivables/kpis`} component={ReceivablesKPIs} />
        <Route path={`/receivables/invoices`} component={ReceivablesInvoices} />
        <Route path={`/payables/review`} component={ReviewPurchaseOrders} />
        <Route path={`/payables/vendor-new`} component={NewVendor} />
        <Route path={`/inventory`} component={InventoryManagement} />
      </Switch>
    </SideNav>
  );
}

export default App;
