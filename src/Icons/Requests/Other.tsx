import * as React from 'react';

const styles = require('../icons.module.css');

export const Other: React.FC<{}> = () => (
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
        className={styles.Icon}
    >
        <path d="M46.7 66.83l4.42 4.42a5 5 0 003.72 1.54h5.23v4.42a6 6 0 006 6h4.42v5.22A5.28 5.28 0 0072 92.11l3.47 3.47A4.9 4.9 0 0078.93 97h13.78a4.31 4.31 0 004.3-4.3V78.92a4.89 4.89 0 00-1.44-3.48L66.83 46.7A32.85 32.85 0 0012.6 12.6a32.85 32.85 0 0034.1 54.23zm-29.85-50a26.85 26.85 0 0143.72 29.45 3 3 0 00.64 3.29L91 79.37V91H79.37l-2.93-2.93V81a3.86 3.86 0 00-3.86-3.86h-6.51v-6.49a3.86 3.86 0 00-3.86-3.86h-7.06l-5.58-5.58a3 3 0 00-3.29-.64 26.85 26.85 0 01-29.44-43.72zm12.56 23.59a11 11 0 10-11-11 11 11 0 0011 11zm0-15.92a5 5 0 11-5 5 5 5 0 015-5.01z" />
    </svg>
);
