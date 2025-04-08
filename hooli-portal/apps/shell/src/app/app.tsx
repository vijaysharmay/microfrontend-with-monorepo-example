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
import { Route, Switch } from 'wouter';
import { AppRoutes } from './routes';
import ShellHome from './shell-home';

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
    {
      sectionLabel: 'Hooli Engineering',
      children: [
        { label: 'Home', icon: <Home20Filled />, href: '/engineering/home' },
        {
          label: 'Reports',
          icon: <ChartPerson20Filled />,
          href: '/engineering/reports',
        },
        {
          label: 'Notifications',
          icon: <Alert20Filled />,
          href: '/engineering/notifications',
        },
      ],
    },
  ];
  return (
    <SideNav heading="Hooli Portal" navItems={navItems}>
      <Switch>
        <Route path="/" component={ShellHome} />
        {AppRoutes()}
        <Route>404</Route>
      </Switch>
    </SideNav>
  );
}

export default App;
