import * as React from 'react';

import { IconProps } from './IconProps';
import { SVGWrapper } from './SVGWrapper';

const styles = require('./icons.module.css');

export const CircleWithDot: React.FC<IconProps> = ({ aspect, color, style = {} }) => (
    <SVGWrapper aspect={aspect} color={color} style={style}>
        <circle className={styles.CircleWithDotCircle} cx="12" cy="12" r="10" />
        <circle className={styles.CircleWithDotDot} cx="12" cy="12" r="6" />
    </SVGWrapper>
);
