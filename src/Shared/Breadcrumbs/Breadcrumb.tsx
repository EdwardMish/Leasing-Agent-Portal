import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../../Types';

interface BreadcrumbProps {
  route: Route;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ route }) => (
  <Link to={route.target}>{route.display}</Link>
);
