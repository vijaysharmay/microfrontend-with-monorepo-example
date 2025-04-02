import { Route } from 'wouter';
import NewVendor from './pages/accounting/new-vendor';
import ReceivablesInvoices from './pages/accounting/receivables-invoices';
import ReceivablesKPIs from './pages/accounting/receivables-kpis';
import ReviewPurchaseOrders from './pages/accounting/review-purchase-orders';
import Home from './pages/home';
import InventoryManagement from './pages/inventory-management';
import NotificationsCenter from './pages/notifications-center';
import Reports from './pages/reports';

export default function Router({ attachPrefixFlag = true }) {
  return (
    <>
      <Route path={'/'} component={Home} />
      <Route path={`/reports`} component={Reports} />
      <Route path={`/notifications`} component={NotificationsCenter} />
      <Route path={`/receivables/kpis`} component={ReceivablesKPIs} />
      <Route path={`/receivables/invoices`} component={ReceivablesInvoices} />
      <Route path={`/payables/review`} component={ReviewPurchaseOrders} />
      <Route path={`/payables/vendor-new`} component={NewVendor} />
      <Route path={`/inventory`} component={InventoryManagement} />
    </>
  );
}
