import {
  Alert20Filled,
  Box20Filled,
  ChartPerson20Filled,
  Home20Filled,
  MoneyHand20Filled,
  PersonMoney20Filled,
} from '@fluentui/react-icons';
import { SideNav, SideNavItem } from '@hooli-portal/uicomponents';
import { Switch } from 'wouter';
import Router from './router';

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
        <Router attachPrefixFlag={false} />
      </Switch>
    </SideNav>
  );
}

export default App;
