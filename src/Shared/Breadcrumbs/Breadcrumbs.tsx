import * as React from 'react';
import { Route } from '../../Types';

import { Breadcrumb } from './Breadcrumb';
import { ChevronRight } from '../../Icons';

import styles from './breadcrumb.module.css';

interface BreadcrumbsProps {
  current: string;
  routes: Route[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  current,
  routes,
}) => (
  <nav className={styles.Breadcrumbs}>
    {routes.map((route: Route) => (
      <span key={route.target} className={styles.Route}>
        <Breadcrumb route={route} />
        <ChevronRight aspect="1rem" />
      </span>
    ))}
    <span className={styles.CurrentPage}>{` ${current}`}</span>
  </nav>
);
