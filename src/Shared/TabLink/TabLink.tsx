import * as React from 'react';
import { NavLink } from 'react-router-dom';

const styles = require('./tab-link.module.css');

interface TabLinkProps {
    tabs: {
        name: string;
        link: string;
        hideTab?: () => boolean;
    }[];
}

export const TabLink: React.FC<TabLinkProps> = ({ tabs, children }) => (
    <div className={styles.TabLink}>
        <div className={styles.TabLinkRow}>
            {
                tabs.map(({
                    name,
                    link,
                    hideTab = () => false,
                }) => !hideTab()
                    && (
                        <NavLink
                            key={`tab-link-${name}`}
                            to={link}
                            activeClassName={styles.TabLinkActiveTab}
                        >
                            {name}
                        </NavLink>
                    ))
            }
        </div>
        <div>{children}</div>
    </div>
);
