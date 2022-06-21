import * as React from 'react';

import { TabGroupNames } from './Types/TabGroupNames';

interface TabGroupProps {
    selected: number;
    selectTab: (tab: number) => void;
    groupType: TabGroupNames | string;
}

const TabGroup: React.FC<TabGroupProps & Record<number | string, any>> = ({
    groupType,
    children,
    selected,
    selectTab,
    ...rest
}) => {
    const renderGroup = () => {
        switch (groupType) {
        case 'LinksPanel':
            return <>{children}</>;
        case 'Panels':
            return (
                <div>
                    {children}
                    <p>Panels</p>
                </div>
            );
        case 'Actions':
            return (
                <div>
                    {children}
                    <p>Actions</p>
                </div>
            );
        case 'invalid':
        default:
            return null;
        }
    };

    return (
        <>
            {renderGroup()}
        </>
    );
};

export default TabGroup;
