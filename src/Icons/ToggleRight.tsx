import * as React from 'react';

const styles = require('./icons.module.css');

export const ToggleRight: React.FC<{}> = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.ToggledOn}
    >
        <rect className={styles.ToggledOnBubble} x="1" y="5" width="22" height="14" rx="7" ry="7" />
        <circle className={styles.ToggledOnSlider} cx="16" cy="12" r="3" />
    </svg>
);
