import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

import { LoadingContent, NoContent } from '../PageElements';

import { DisplayGroup } from './Types/DisplayGroup';
import { TabGroupNames } from './Types/TabGroupNames';
import { Tab } from './Types/Tab';
import { TabLink } from './Types/TabLink';

import DesktopTabsLayout from './Layouts/DesktopTabsLayout';
import MobileTabsLayout from './Layouts/MobileTabsLayout';

import styles from './tabs.module.css';

interface TabsProps {
    defaultTab?: number;
}

const buildArray = (group, arr): any[] => {
    if (Array.isArray(group)) {
        return [...arr, ...group];
    }
    if (typeof group === 'object') {
        return [...arr, group];
    }
    return [...group];
};

const Tabs: React.FC<TabsProps> = ({ children, defaultTab = 0 }) => {
    const isMobile = useMediaQuery({ maxWidth: 750 });
    const { pathname } = useLocation();

    const [tabGroupsVerified, toggleVerification] = React.useState<0 | 1 | 2>(0);
    const [currentlySelectedTab, setCurrentlySelectedTab] = React.useState<number>(defaultTab);
    const [displayGroups, setDisplayGroups] = React.useState<DisplayGroup | undefined>();

    // If using links, the default tab will never be overwritten
    React.useEffect(() => {
        if (displayGroups) {
            const { header } = displayGroups;

            header.items.forEach((item, index) => {
                // @ts-ignore next-line: ts(2339)
                const itemType: string = item.type?.displayName;

                if (itemType === 'HeaderLink' && pathname.includes(item.props.link)) setCurrentlySelectedTab(index);
            });
        }
    }, [displayGroups, pathname]);

    React.useEffect(() => {
        if (!children || React.Children.toArray(children).length < 2) {
            toggleVerification(2);
        } else {
            let actions: React.ReactElement[] = [];
            let items: React.ReactElement[] = [];
            let headerItems: React.ReactElement[] = [];
            let type: 'Panels' | 'LinksPanel' = 'Panels';
            let style: React.CSSProperties = {};

            React.Children.forEach(children, (child) => {
                if (!React.isValidElement(child)) return;

                // @ts-ignore next-line: ts(2339)
                const name: TabGroupNames | string = child.type?.displayName;

                if (name === 'Actions') actions = buildArray(child.props.children, actions);

                if (name === 'Header') {
                    headerItems = buildArray(child.props.children, headerItems);

                    if (child.props.style) {
                        style = {
                            ...style,
                            ...child.props.style,
                        };
                    }
                }

                if (name === 'Panels' || name === 'LinksPanel') {
                    items = buildArray(child.props.children, items);

                    type = name;
                }
            });

            setDisplayGroups({
                actions,
                panels: {
                    type,
                    items,
                },
                header: {
                    style,
                    items: headerItems,
                },
            });

            toggleVerification(1);
        }
    }, []);

    const handleTab = (tab: number) => {
        setCurrentlySelectedTab(tab);
    };

    return (
        <>
            {tabGroupsVerified > 0 && displayGroups ? (
                <>
                    {tabGroupsVerified === 1 ? (
                        <>
                            {isMobile ? (
                                <MobileTabsLayout selected={currentlySelectedTab} selectTab={handleTab} {...displayGroups} />
                            ) : (
                                <DesktopTabsLayout
                                    selected={currentlySelectedTab}
                                    selectTab={handleTab}
                                    {...displayGroups}
                                />
                            )}
                        </>
                    ) : (
                        <NoContent message="Improper Configuration." />
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};

export const Wrapper: React.FC<any> = ({ children }) => <>{children}</>;

export const Header: React.FC<{ style?: React.CSSProperties }> = ({ style = {}, children }) => (
    <div style={{ ...style }}>{children}</div>
);
export const Panels: React.FC<{}> = ({ children }) => <>{children}</>;
export const Panel: React.FC<{}> = ({ children }) => <>{children}</>;
export const LinksPanel: React.FC<{}> = ({ children }) => <>{children}</>;
export const Action: React.FC = ({ children }) => <div className={styles.ActionItem}>{children}</div>;
export const Actions: React.FC<any> = ({ children, ...rest }) => (
    <>
        {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) return React.cloneElement(<Action {...rest}>{child}</Action>, { ...rest });

            return child;
        })}
    </>
);
export const HeaderItem: React.FC<Tab> = ({ children, ...rest }) => <div {...rest}>{children}</div>;
export const HeaderLink: React.FC<TabLink> = ({ children, ...rest }) => <div {...rest}>{children}</div>;

Header.displayName = 'Header';
Panels.displayName = 'Panels';
Panel.displayName = 'Panel';
LinksPanel.displayName = 'LinksPanel';
Actions.displayName = 'Actions';
Action.displayName = 'Action';
HeaderItem.displayName = 'HeaderItem';
HeaderLink.displayName = 'HeaderLink';

export default Tabs;
