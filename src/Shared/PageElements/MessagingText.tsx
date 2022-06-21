import React from 'react';

import styles from './messaging-text.module.css';

interface MessagingTextProps {
    text?: string;
    date?: boolean;
    time?: boolean;
    name?: boolean;
    title?: boolean;
}

export const MessagingText: React.FC<MessagingTextProps> = ({ text, date, time, name, title }) => {
    return (
        <p
            className={
                date
                    ? styles.DateBreak
                    : time
                    ? styles.TimeText
                    : name
                    ? styles.UserNameText
                    : title
                    ? styles.RoleText
                    : styles.MessageText
            }
        >
            {text}
        </p>
    );
};

