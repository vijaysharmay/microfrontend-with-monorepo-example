import {
  Alert20Filled,
  ChartPerson20Filled,
  Home20Filled,
} from "@fluentui/react-icons";
import { SideNav, SideNavItem } from "@hooli-portal/uicomponents";
import { Route, Switch } from "wouter";
import Home from "./home";
import Notifications from "./notifications";
import Reports from "./reports";

export function App() {
  const navItems: SideNavItem[] = [
    { label: "Home", icon: <Home20Filled />, href: "/" },
    { label: "Reports", icon: <ChartPerson20Filled />, href: "/reports" },
    { label: "Notifications", icon: <Alert20Filled />, href: "/notifications" },
  ];
  return (
    <SideNav heading="Hooli Engineering" navItems={navItems}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/reports" component={Reports} />
        <Route path="/notifications" component={Notifications} />
        <Route>404 from engineering</Route>
      </Switch>
    </SideNav>
  );
}

export default App;
