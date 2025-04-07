import {
  Alert20Filled,
  ChartPerson20Filled,
  CollectionsAdd20Filled,
  Home20Filled,
  Reward20Filled,
} from '@fluentui/react-icons';
import { SideNav, SideNavItem } from '@hooli-monorepo/uicomponents';
import { Route, Switch } from 'wouter';
import Home from './pages/home';
import NewJobRequisition from './pages/job-requisition/new-job-requisition';
import ViewJobRequisitions from './pages/job-requisition/view-job-requisitions';
import NotificationsCenter from './pages/notifications-center';
import Reports from './pages/reports';
import AnnualReviews from './pages/rewards-and-recognition/annual-reviews';
import SharePerspectives from './pages/rewards-and-recognition/share-perspectives';

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
        <Route path={'/'} component={Home} />
        <Route path={`/reports`} component={Reports} />
        <Route path={`/notifications`} component={NotificationsCenter} />
        <Route path={`/requisition/new`} component={NewJobRequisition} />
        <Route path={`/requisition/view`} component={ViewJobRequisitions} />
        <Route path={`/rewards/review`} component={AnnualReviews} />
        <Route path={`/rewards/share`} component={SharePerspectives} />
      </Switch>
    </SideNav>
  );
}

export default App;
