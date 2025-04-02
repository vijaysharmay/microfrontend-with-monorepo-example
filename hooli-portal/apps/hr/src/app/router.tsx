import { Route, Switch } from 'wouter';

import Home from './pages/home';
import NewJobRequisition from './pages/job-requisition/new-job-requisition';
import ViewJobRequisitions from './pages/job-requisition/view-job-requisitions';
import NotificationsCenter from './pages/notifications-center';
import Reports from './pages/reports';
import AnnualReviews from './pages/rewards-and-recognition/annual-reviews';
import SharePerspectives from './pages/rewards-and-recognition/share-perspectives';

export default function Router({ attachPrefixFlag = true }) {
  const prefix = attachPrefixFlag ? 'hr/' : '';
  return (
    <Switch>
      <Route path={`/${prefix}`} component={Home} />
      <Route path={`/${prefix}reports`} component={Reports} />
      <Route path={`/${prefix}notifications`} component={NotificationsCenter} />
      <Route path={`/${prefix}requisition/new`} component={NewJobRequisition} />
      <Route
        path={`/${prefix}requisition/view`}
        component={ViewJobRequisitions}
      />
      <Route path={`/${prefix}rewards/review`} component={AnnualReviews} />
      <Route path={`/${prefix}rewards/share`} component={SharePerspectives} />
      <Route>404: No such page in Hooli HR Portal !</Route>
    </Switch>
  );
}
