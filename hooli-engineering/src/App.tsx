import {
  Alert20Filled,
  ChartPerson20Filled,
  Home20Filled,
} from "@fluentui/react-icons";
import { SideNav, SideNavItem } from "@hooli-portal/uicomponents";

export function App() {
  const navItems: SideNavItem[] = [
    { label: "Home", icon: <Home20Filled />, href: "/" },
    { label: "Reports", icon: <ChartPerson20Filled />, href: "/reports" },
    { label: "Notifications", icon: <Alert20Filled />, href: "/notifications" },
  ];
  return (
    <SideNav heading="Hooli Engineering" navItems={navItems}>
      <div>Hello to Hooli Engineering</div>
    </SideNav>
  );
}

export default App;
