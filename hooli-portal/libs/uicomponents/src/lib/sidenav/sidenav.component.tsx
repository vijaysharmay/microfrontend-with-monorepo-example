import {
  AppItem,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';

import { makeStyles, tokens } from '@fluentui/react-components';
import { has } from 'lodash';
import React from 'react';
import {
  SideNavItem,
  SideNavMenuItem,
  SideNavProps,
  SideNavSection,
  SideNavSectionCategory,
  SideNavSectionItem,
} from './sidenav.types';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '100vh',
  },
  nav: {
    minWidth: '200px',
  },
  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  field: {
    display: 'flex',
    marginTop: '4px',
    marginLeft: '8px',
    flexDirection: 'column',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const SideNav = ({ heading, navItems, children }: SideNavProps) => {
  const styles = useStyles();

  const renderSideNavMenuItem = (item: SideNavMenuItem) => {
    return (
      <NavItem
        key={item.label}
        icon={item.icon ? { children: item.icon } : undefined}
        href={item.href}
        value={item.label}
      >
        {item.label}
      </NavItem>
    );
  };

  const renderSideNavCategoryItem = (item: SideNavSectionCategory) => {
    return (
      <NavCategory key={item.categoryLabel} value={item.categoryLabel}>
        <NavCategoryItem
          icon={item.icon ? { children: item.icon } : undefined}
          value={item.categoryLabel}
        >
          {item.categoryLabel}
        </NavCategoryItem>
        <NavSubItemGroup>
          {item.children.map((child: SideNavMenuItem) => {
            return (
              <NavSubItem
                key={child.label}
                href={child.href}
                value={child.label}
              >
                {child.label}
              </NavSubItem>
            );
          })}
        </NavSubItemGroup>
      </NavCategory>
    );
  };

  const renderSideNavSectionItem = (item: SideNavSection) => {
    return (
      <React.Fragment key={item.sectionLabel}>
        <NavSectionHeader>{item.sectionLabel}</NavSectionHeader>
        {item.children.map((child: SideNavSectionItem) => {
          if (has(child, 'children')) {
            return renderSideNavCategoryItem(child as SideNavSectionCategory);
          } else {
            return renderSideNavMenuItem(child as SideNavMenuItem);
          }
        })}
      </React.Fragment>
    );
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        open={true}
        type="inline"
        density="small"
        className={styles.nav}
      >
        <NavDrawerBody>
          <AppItem as="a" href="/">
            {heading}
          </AppItem>
          {navItems.map((item: SideNavItem) => {
            if (has(item, 'children')) {
              return renderSideNavSectionItem(item as SideNavSection);
            } else {
              return renderSideNavMenuItem(item as SideNavMenuItem);
            }
          })}
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
