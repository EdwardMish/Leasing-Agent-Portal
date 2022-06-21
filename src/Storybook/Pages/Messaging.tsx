import React, { useEffect, useRef } from 'react';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import { ForwardButton } from '../molecules/NavigationButtons';
import { MessagingText } from '../../Shared/PageElements/MessagingText';

import styles from './messaging.module.css';

interface Props {
    title: string;
    messageList?: messagesProps[];
    isSubmitting?: boolean;
}

interface messagesProps {
    date: string;
    messages: messageProps[];
}

interface messageProps {
    user?: boolean;
    userName?: string;
    text?: string;
    date?: string;
    time?: string;
    title?: string;
}

const Messaging: React.FC<Props> = ({ title, messageList, isSubmitting }) => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollBottom();
    }, []);

    return (
        <div className={styles.ActivityWrapper}>
            <div className={styles.ScrollWrapper}>
                {messageList && (
                    <div className={styles.MessagingWrapper}>
                        {messageList?.map((date) => (
                            <>
                                <div className={styles.Date}>
                                    <FlexWrapper justify="center" align="center">
                                        <MessagingText text={date.date} date />
                                    </FlexWrapper>
                                </div>

                                {date.messages.map((data) => (
                                    <>
                                        {data.user ? (
                                            <>
                                                <div className={`${styles.TitleDate} ${styles.Right}`}>
                                                    <MessagingText text={data.time} time />
                                                </div>
                                                <FlexWrapper justify="end" align="start">
                                                    <div className={styles.MessageWrapper}>
                                                        <MessagingText text={data.text} />
                                                    </div>
                                                </FlexWrapper>
                                            </>
                                        ) : (
                                            <>
                                                <div className={styles.TitleDate}>
                                                    <FlexWrapper justify="start" align="center">
                                                        <MessagingText text={data.userName} name />

                                                        <MessagingText text={data.time} time />
                                                    </FlexWrapper>
                                                    <MessagingText text={data.title} title />
                                                </div>
                                                <FlexWrapper justify="start" align="start">
                                                    <div className={`${styles.MessageWrapper} ${styles.OtherUser}`}>
                                                        <MessagingText text={data.text} />
                                                    </div>
                                                </FlexWrapper>
                                            </>
                                        )}
                                    </>
                                ))}

                                <div className={styles.BottomSpacer} ref={messagesEndRef}></div>
                            </>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.ChatWrapper}>
                <textarea className={styles.MockTextArea} placeholder={'Send Message'} />
                <FlexWrapper justify="end" align="start">
                    <ForwardButton title={'Send'} />
                </FlexWrapper>
            </div>
        </div>
    );
};

export default Messaging;

