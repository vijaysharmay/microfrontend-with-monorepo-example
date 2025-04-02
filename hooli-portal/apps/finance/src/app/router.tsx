import { Route, Switch } from 'wouter';
import NewVendor from './pages/accounting/new-vendor';
import ReceivablesInvoices from './pages/accounting/receivables-invoices';
import ReceivablesKPIs from './pages/accounting/receivables-kpis';
import ReviewPurchaseOrders from './pages/accounting/review-purchase-orders';
import Home from './pages/home';
import InventoryManagement from './pages/inventory-management';
import NotificationsCenter from './pages/notifications-center';
import Reports from './pages/reports';

export default function Router({ attachPrefixFlag = true }) {
  const prefix = attachPrefixFlag ? 'finance/' : '';
  return (
    <Switch>
      <Route path={`/${prefix}`} component={Home} />
      <Route path={`/${prefix}reports`} component={Reports} />
      <Route path={`/${prefix}notifications`} component={NotificationsCenter} />
      <Route path={`/${prefix}receivables/kpis`} component={ReceivablesKPIs} />
      <Route
        path={`/${prefix}receivables/invoices`}
        component={ReceivablesInvoices}
      />
      <Route
        path={`/${prefix}payables/review`}
        component={ReviewPurchaseOrders}
      />
      <Route path={`/${prefix}payables/vendor-new`} component={NewVendor} />
      <Route path={`/${prefix}inventory`} component={InventoryManagement} />
      <Route>404: No such page in Hooli Finance Portal !</Route>
    </Switch>
  );
}
