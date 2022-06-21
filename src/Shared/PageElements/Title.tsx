import { IconColors } from 'Icons';
import React from 'react';

import styles from './title.module.css';

interface Properties {
    title: string;
    noMarginBottom?: boolean;
    level?: 'h1' | 'h2' | 'h3' | 'h4';
    color?: IconColors;
}

function Title({ title, noMarginBottom, level = 'h1', color }: Properties): React.ReactElement {
    const fontSizes = {
        h1: '2em',
        h2: '1.5em',
        h3: '1.17em',
        h4: '1em',
    };

    const cssClassName = noMarginBottom ? `${styles.PageHeader} ${styles.NoMargin}` : styles.PageHeader;
    const titleStyle = { fontSize: fontSizes[level] };
    return (
        <h1 className={cssClassName} style={{ ...titleStyle, color: color ?? '' }}>
            {title}
        </h1>
    );
}

export default Title;
