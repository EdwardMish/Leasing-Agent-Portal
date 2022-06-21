import * as React from 'react';

import { DisplayGroup } from '../Types/DisplayGroup';

import DesktopHeader from '../Header/DesktopHeader';
import TabGroup from '../TabGroup';

type DesktopTabsLayoutProps = DisplayGroup & {
    selected: number;
    selectTab: (tab: number) => void;
}

const DesktopTabsLayout: React.FC<DesktopTabsLayoutProps> = ({
    actions,
    panels,
    header,
    selected,
    selectTab,
    ...rest
}) => (
    <>
        <DesktopHeader
            actions={actions}
            items={header.items}
            selected={selected}
            selectTab={selectTab}
            style={header.style}
        />
        <TabGroup
            selected={selected}
            selectTab={selectTab}
            groupType={panels.type}
            {...rest}
        >
            {panels.items}
        </TabGroup>
    </>
);

export default DesktopTabsLayout;
