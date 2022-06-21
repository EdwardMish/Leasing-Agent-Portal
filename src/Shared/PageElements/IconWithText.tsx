import * as React from 'react';

import { IconColors } from '../../Icons';
import { IconProps } from '../../Icons/IconProps';

import styles from './icon-with-text.module.css';

interface IconWithTextProps {
    text: string;
    textSize?: string;
    Icon: React.FC<IconProps>;
    iconAspect?: string;
    iconOnLeft?: boolean;
    color?: IconColors;
    style?: React.CSSProperties;
    wrapText?: boolean;
}

const IconWithText: React.FC<IconWithTextProps> = ({
    text,
    textSize = '.75rem',
    Icon,
    iconAspect = '1.2rem',
    iconOnLeft = false,
    color = IconColors.BrandBlue,
    style = {},
    wrapText = false,
}) => (
    <div className={styles.IconWithText} style={style}>
        {iconOnLeft ? (
            <>
                <Icon color={color} aspect={iconAspect} style={{ minWidth: iconAspect }} />
                <p
                    className={styles.IconOnLeft}
                    style={{ color, fontSize: textSize, ...(wrapText ? { whiteSpace: 'normal' } : {}) }}
                >
                    {text}
                </p>
            </>
        ) : (
            <>
                <p
                    className={styles.IconOnRight}
                    style={{ color, fontSize: textSize, ...(wrapText ? { whiteSpace: 'normal' } : {}) }}
                >
                    {text}
                </p>
                <Icon color={color} aspect={iconAspect} style={{ minWidth: iconAspect }} />
            </>
        )}
    </div>
);

export default IconWithText;
