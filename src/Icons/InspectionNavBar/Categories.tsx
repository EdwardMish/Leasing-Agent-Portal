import * as React from 'react';

import { IconProps } from '../IconProps';
import { SVGFillWrapper } from '../SVGFillWrapper';

export const Categories: React.FC<IconProps> = ({ aspect, color }) => (
    <SVGFillWrapper aspect={aspect} color={color}>
        <path d="M17 0a3 3 0 012.995 2.824L20 3v14a3 3 0 01-2.824 2.995L17 20H3a3 3 0 01-2.995-2.824L0 17V3A3 3 0 012.824.005L3 0h14zm-.143 2H10v16h6.857c.586 0 1.07-.386 1.135-.883L18 17V3c0-.513-.441-.936-1.01-.993L16.857 2z" />
    </SVGFillWrapper>
);
