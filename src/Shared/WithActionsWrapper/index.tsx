import React from 'react';
import { FlexWrapper } from 'Shared/FlexWrapper';
import DesktopHeaderActions from 'Shared/Tabs/Header/DesktopHeaderActions';

interface Props {
    actions: any;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const WithActionsWrapper = ({ actions, children, style }: Props) => (
    <FlexWrapper justify="between" align="start">
        {children}
        {actions && <DesktopHeaderActions actions={actions} omitToggle={false} style={style} />}
    </FlexWrapper>
);

export default WithActionsWrapper;
