import * as React from 'react';
import { Phone } from '../../Icons';
import { formatPhone } from '../../utils';

import { FlexWrapper } from '../FlexWrapper';

const styles = require('./phone-icon-row.module.css');

interface PhoneRowProps {
    color: string;
    phone: string | undefined;
}

export const PhoneIconRow: React.FC<PhoneRowProps> = ({ color, phone }) => {
    if (!phone) return null;

    const formatted: string | undefined = formatPhone(phone);

    return formatted ? (
        <FlexWrapper className={styles.PhoneIconRow} style={{ color }} justify="start" align="center">
            <Phone />
            <p>{formatted}</p>
        </FlexWrapper>
    ) : null;
};
