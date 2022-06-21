import * as React from 'react';

import { PECOLogo } from '../../PECOLogo';
import { FlexWrapper } from '../../../Shared/FlexWrapper';

import styles = require('./error-header.module.css');
import { Link } from 'react-router-dom';

interface Properties {
    LeftComponent?: React.ReactElement;
    RightComponent?: React.ReactElement;
}

const Header: React.FC<Properties> = ({ LeftComponent, RightComponent }) => (
    <FlexWrapper align="center" justify="between" className={styles.Header}>
        <div>{!!LeftComponent && LeftComponent}</div>
        <Link to="/">
            <PECOLogo />
        </Link>
        <div>{!!RightComponent && RightComponent}</div>
    </FlexWrapper>
);

export default Header;
