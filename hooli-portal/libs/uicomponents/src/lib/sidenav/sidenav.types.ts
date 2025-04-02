export type SideNavSectionCategory = {
  categoryLabel: string;
  icon: React.ReactNode;
  children: SideNavMenuItem[];
};

export type SideNavSectionItem = SideNavMenuItem | SideNavSectionCategory;

export type SideNavSection = {
  sectionLabel: string;
  children: SideNavSectionItem[];
};

export type SideNavMenuItem = {
  label: string;
  icon?: React.ReactNode;
  href: string;
};

export type SideNavItem = SideNavMenuItem | SideNavSection;

export type SideNavProps = {
  heading: string;
  navItems: SideNavItem[];
  children: React.ReactNode;
};
