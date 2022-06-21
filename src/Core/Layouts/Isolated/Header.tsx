import * as React from 'react';

import { PECOLogo } from '../../PECOLogo';
import { FlexWrapper } from '../../../Shared/FlexWrapper';

import styles = require('./isolated-header.module.css');

interface HeaderProps {
    LeftComponent?: React.ReactElement;
    RightComponent?: React.ReactElement;
}

const Header: React.FC<HeaderProps> = ({ LeftComponent, RightComponent }) => (
    <FlexWrapper align="center" justify="between" className={styles.Header}>
        <div>{!!LeftComponent && LeftComponent}</div>
        <PECOLogo />
        <div>{!!RightComponent && RightComponent}</div>
    </FlexWrapper>
);

export default Header;
