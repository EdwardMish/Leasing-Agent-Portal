import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Route } from '../../Types';
import { Breadcrumbs } from '../Breadcrumbs';

const styles = require('./page-wrapper.module.css');

interface PageWrapperProps {
    breadCrumbs?: {
        current: string;
        routes: Route[];
    },
    className?: string;
    pageTitle?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
    children, breadCrumbs, className, pageTitle,
}) => (
    <>
        {
            !!breadCrumbs
            && breadCrumbs.hasOwnProperty('current')
            && breadCrumbs.hasOwnProperty('routes')
            && (
                <div className={styles.PageWrapperBreadcrumbs}>
                    <Breadcrumbs
                        current={breadCrumbs.current}
                        routes={breadCrumbs.routes}
                    />
                </div>
            )
        }
        <Helmet>
            <title>{pageTitle || 'Dashcomm'}</title>
        </Helmet>
        <div className={`${styles.PageWrapper} ${className || ''}`}>
            {children}
        </div>
    </>
);
