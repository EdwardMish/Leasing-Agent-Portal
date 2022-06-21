import * as React from 'react';

const styles = require('../icons.module.css');

export const Property: React.FC<{}> = () => (
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
        <path d="M233 507h131v77H233v-77zm161-30H203v107h-32v30h251v-30h-28V477zm155 106h43v-30h-43v30zm73-261h130c14 83-130 117-130 0zm71 330h-69V439H468v213H136V424c46 12 92-11 111-54 34 76 143 76 176 0 33 76 143 76 176 0 16 36 55 61 94 57v225zM498 469h96v183h-96V469zM94 322h130c0 115-144 85-130 0zm126-127h48l-32 97H117l103-97zm180 127c0 101-130 101-130 0h130zm8-127v97H268l32-97h108zm168 127c0 101-130 101-130 0h130zM438 195h105l38 97H438v-97zm178 0l110 97H613l-38-97h41zm162 107l-3-10-147-127H208L71 292c-15 46-9 90 35 119v271h617V420c47-19 70-70 55-118z" />
    </svg>
);
