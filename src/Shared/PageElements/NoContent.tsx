import * as React from 'react';

const styles = require('./no-content.module.css');

interface NoContentProps {
    message: string;
    allowReload?: boolean;
    reloadAction?: () => void;
    reloadMessage?: string;
    lowProfile?: boolean;
    withMarginTop?: boolean;
    withMarginBottom?: boolean;
}

export const NoContent: React.FC<NoContentProps> = ({
    allowReload = false,
    message,
    reloadAction = () => { },
    reloadMessage = 'Click to Retry',
    lowProfile = false,
    withMarginTop = true,
    withMarginBottom = true,
}) => (
    <div
        style={{
            padding: lowProfile ? '1rem' : '2rem',
            margin: '0',
            marginTop: withMarginTop ? '1rem' : '0',
            marginBottom: withMarginBottom ? '1rem' : '0',
        }}
        className={styles.NoContent}
    >
        <p>{message}</p>
        {allowReload && <p onClick={reloadAction}>{reloadMessage}</p>}
    </div>
);
