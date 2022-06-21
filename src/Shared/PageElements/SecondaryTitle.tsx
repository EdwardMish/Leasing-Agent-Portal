import * as React from 'react';

const styles = require('./secondary-title.module.css');

interface SecondaryTitleProps {
    title: string;
    withMargin?: boolean;
    noBorderBottom?: boolean;
}

export const SecondaryTitle: React.FC<SecondaryTitleProps> = ({ title, withMargin = true, noBorderBottom = false }) => (
    <div
        className={`${styles.SecondaryTitle} ${
            withMargin ? styles.SecondaryTitleWithMargin : styles.SecondaryTitleNoMargin
        } ${ noBorderBottom ? styles.NoBorderBottom : ''} titleSelectReactLoading`}
    >
        <h2>{title}</h2>
    </div>
);
