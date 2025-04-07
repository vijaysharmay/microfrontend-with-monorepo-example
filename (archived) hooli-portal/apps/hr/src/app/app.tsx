import {
  Alert20Filled,
  ChartPerson20Filled,
  CollectionsAdd20Filled,
  Home20Filled,
  Reward20Filled,
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
      sectionLabel: 'Talent Management',
      children: [
        {
          categoryLabel: 'Manage Open Positions',
          icon: <CollectionsAdd20Filled />,
          children: [
            { label: 'Create Job Requisition', href: '/requisition/new' },
            { label: 'View Job Requisitions', href: '/requisition/view' },
          ],
        },
        {
          categoryLabel: 'Rewards & Recognition',
          icon: <Reward20Filled />,
          children: [
            { label: 'Annual Reviews', href: '/rewards/review' },
            { label: 'Share Perspectives', href: '/rewards/share' },
          ],
        },
      ],
    },
  ];
  return (
    <SideNav heading="Hooli HR" navItems={navItems}>
      <Switch>
        <Router attachPrefixFlag={false} />
      </Switch>
    </SideNav>
  );
}

export default App;
