import FeedbackAPI from 'API/Feedback/FeedbackAPI';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { MessageCircle, Star } from '../../Icons';
import { Button } from '../../Shared/Button';
import { Inputs, useControlledForm } from '../../Shared/FormFields';
import Modal from 'Shared/Modal/Modal';
import { addErrorMessage, addSuccessMessage } from '../../State/GlobalMessages/actionCreators';

const styles = require('./feedback-panel.module.css');

export const FeedbackPanel: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const [inputReceived, toggleInputReceive] = React.useState<boolean>(false);
    const [showModal, toggleModal] = React.useState<boolean>(false);
    const [currentSelection, setCurrentSelection] = React.useState<number>(0);

    const [inputValue, handler] = useControlledForm();

    const sendUserInput = () => {
        FeedbackAPI.sendFeedback(currentSelection, inputValue)
            .then(() => {
                toggleInputReceive(true);

                dispatch(addSuccessMessage('Your feedback was received. Thank you.'));
            })
            .catch(() => {
                toggleInputReceive(false);

                dispatch(addErrorMessage('Your feedback was not received. Please try again.'));
            });
    };

    return (
        <>
            <div className={styles.FeedBackButton} onClick={() => toggleModal(!showModal)}>
                <MessageCircle />
                <p>Send Feedback</p>
            </div>
            {showModal && (
                <Modal
                    header={inputReceived ? 'Feedback Received' : 'Send Feedback'}
                    callBack={() => {
                        toggleModal(false);
                    }}
                >
                    <div className={styles.SatisfactionBlock}>
                        {inputReceived ? (
                            <div className={styles.InputReceived}>
                                <p className={styles.InputReceivedHeader}>Thank You!</p>
                                <p>We appreciate your feedback.</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.StarRow}>
                                    {[1, 2, 3, 4, 5].map((val: number) => (
                                        <div
                                            key={`rating-star-${val}`}
                                            className={`${
                                                currentSelection >= val ? styles.SelectedValue : styles.NotSelected
                                            }`}
                                            onClick={() => {
                                                setCurrentSelection(val);
                                            }}
                                        >
                                            <Star />
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.AdditionalInformation}>
                                    <Inputs.TextArea
                                        id="tell-us-more"
                                        name="Tell us more about your experience (optional)"
                                        handler={handler}
                                        value={inputValue}
                                    />
                                    <Button
                                        callback={sendUserInput}
                                        text="Send Feedback"
                                        fullWidth
                                        disable={currentSelection === 0}
                                        withMarginTop
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
};

