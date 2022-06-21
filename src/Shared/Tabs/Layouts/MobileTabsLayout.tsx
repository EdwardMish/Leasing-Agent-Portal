import * as React from 'react';

import { DisplayGroup } from '../Types/DisplayGroup';

import MobileHeader from '../Header/MobileHeader';
import TabGroup from '../TabGroup';

type MobileTabsLayoutProps = DisplayGroup & {
    selected: number;
    selectTab: (tab: number) => void;
}

const MobileTabsLayout: React.FC<MobileTabsLayoutProps> = ({
    actions,
    panels,
    header,
    selected,
    selectTab,
    ...rest
}) => (
    <>
        <div style={{ margin: '1rem 0 0' }}>
            <MobileHeader
                actions={actions}
                items={header.items}
                selected={selected}
                selectTab={selectTab}
                style={header.style}
            />
        </div>
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

export default MobileTabsLayout;
