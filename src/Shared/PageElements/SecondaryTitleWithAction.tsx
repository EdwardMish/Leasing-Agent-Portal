import * as React from 'react';

import IconWithText from './IconWithText';

const styles = require('./secondary-title.module.css');

interface SecondaryTitleWithActionProps {
    title: string;
    action: {
        callBack: () => void;
        actionTitle?: string;
    };
    ActionIcon: any;
    withMargin?: boolean;
}

export const SecondaryTitleWithAction: React.FC<SecondaryTitleWithActionProps> = ({
    action,
    ActionIcon,
    title,
    withMargin = true,
}) => {
    const { actionTitle = '', callBack } = action;

    return (
        <div
            className={`${styles.SecondaryTitleWithAction} ${
                withMargin ? styles.SecondaryTitleWithMargin : styles.SecondaryTitleNoMargin
            } titleSelectReact`}
            onClick={callBack}
        >
            <h2>{title}</h2>
            <div className={styles.SecondaryAction}>
                <IconWithText text={actionTitle} Icon={ActionIcon} />
            </div>
        </div>
    );
};

