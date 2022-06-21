import { Message } from 'API/Leasing/Types';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, TextArea } from 'Shared/Forms';
import { useCurrentUser } from 'State/CurrentUser/Hooks';
import { formatDate, isSameDate } from 'utils';
import * as Yup from 'yup';
import styles from './messaging.module.css';

const textareaStyle: React.CSSProperties = {
    backgroundColor: 'rgb(240, 240, 240)',
    resize: 'vertical',
    minHeight: '50px',
};

interface Props {
    messageList?: Message[];
    isSending: boolean;
    sendMessage: (msg: string) => void;
    leaseAppCompleted?: boolean;
}

const Messaging: React.FC<Props> = ({ messageList, isSending, sendMessage, leaseAppCompleted }) => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const messageStartRef = useRef<null | HTMLDivElement>(null);
    const { currentUser } = useCurrentUser();
    const fullName = `${currentUser.firstName} ${currentUser.lastName}`;

    const scrollBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollBottom();
    }, [messageList]);

    return (
        <>
            <div className={styles.ScrollWrapper}>
                {messageList && (
                    <div className={styles.MessagingWrapper}>
                        {messageList.map(({ sent, sentBy, message }, index, arr) => (
                            <div key={`${sentBy}-${index}`} ref={!index ? messageStartRef : null}>
                                {index === 0 && (
                                    <p className={styles.DateWrapper}>{formatDate(sent, 'EEEE, MMMM dd, yyyy')}</p>
                                )}
                                <FlexWrapper justify={sentBy === fullName ? 'end' : 'start'} align="start">
                                    <div className={styles.MessageHeader}>
                                        <span>{sentBy === fullName ? `You` : sentBy}</span>
                                        <span>{formatDate(sent, 'p')}</span>
                                    </div>
                                </FlexWrapper>
                                <FlexWrapper justify={sentBy === fullName ? 'end' : 'start'} align="start">
                                    <div className={styles.MessageWrapper}>
                                        <p className={styles.MessageText}>{message}</p>
                                    </div>
                                </FlexWrapper>
                                <div className={styles.BottomSpacer} ref={messagesEndRef}></div>
                                {index > 0 && !isSameDate(sent, arr[index - 1]?.sent) && (
                                    <p className={styles.DateWrapper}>{formatDate(sent, 'EEEE, MMMM dd, yyyy')}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.ChatWrapper}>
                {!leaseAppCompleted ? (
                    <Formik
                        initialValues={{ message: '' }}
                        onSubmit={(values, { resetForm }) => {
                            sendMessage(values.message);
                            resetForm({ values: { message: '' } });
                        }}
                        validationSchema={Yup.object({
                            message: Yup.string()
                                .required('A message is required')
                                .max(4000, 'A message must be 4000 characters or fewer'),
                        })}
                    >
                        {() => (
                            <Form>
                                <TextArea
                                    id="message"
                                    rows={3}
                                    label="message"
                                    hideLabel
                                    name="message"
                                    placeholder={'Send Message'}
                                    style={textareaStyle}
                                />
                                <FlexWrapper justify="end" align="start">
                                    <FormButtons.Submit style={{ marginTop: '0.5rem' }} text={'SEND'} disable={isSending} />
                                </FlexWrapper>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <div className={styles.DisabledTextWrapper}>
                        You can no longer send messages once application is completed.
                    </div>
                )}
            </div>
        </>
    );
};

export default Messaging;
