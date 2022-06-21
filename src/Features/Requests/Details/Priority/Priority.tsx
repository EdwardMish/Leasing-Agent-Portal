import { RequestsAPI } from 'API/Requests';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import * as Yup from 'yup';
import { Pencil } from '../../../../Icons';
import { SelectInputs, TextArea } from '../../../../Shared/Forms';
import { globalMessageActionCreators, Requests } from '../../../../State';
import { RequestPriority } from '../../../../Types';
import { capitalizeFirstLetter } from '../../../../utils';

const styles = require('./priority.modal.css');

interface PriorityProps {
    requestId: number;
}

export const Priority: React.FC<PriorityProps> = ({ requestId }) => {
    const { selectors } = Requests;

    const dispatch = useDispatch();

    const request: Requests.Types.Request = useSelector(selectors.request(requestId));

    const [showModal, toggleModal] = React.useState<boolean>(false);

    const updatePriority = ({ note, priority }) => {
        RequestsAPI.changePriority(requestId, priority, note)
            .then(() => {
                dispatch({
                    type: Requests.Actions.UPDATE_PRIORITY,
                    payload: {
                        id: requestId,
                        priority,
                    },
                } as Requests.ActionTypes);

                toggleModal(false);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('The priority could not be changed at this time.'));
            });
    };

    const validationSchema = Yup.object().shape({
        note: Yup.string()
            .min(10, 'Note must be at least 10 characters')
            .max(100, 'Note must not exceed 100 characters')
            .required('Note Required'),
    });

    return (
        <>
            <div className={styles.PriorityRow}>
                <p>Priority:</p>
                <p>{capitalizeFirstLetter(request.priority)}</p>
                <div
                    className={styles.PriorityRowIcon}
                    onClick={() => {
                        toggleModal(true);
                    }}
                >
                    <Pencil />
                </div>
            </div>
            {showModal && (
                <Formik
                    initialValues={{
                        note: '',
                        priority: request.priority as RequestPriority,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={updatePriority}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form>
                            <ModalWithAction
                                header="Change Priority"
                                actionText="Update Priority"
                                disable={isSubmitting || !isValid}
                                cancelCallback={() => toggleModal(false)}
                                actionCallback={handleSubmit}
                            >
                                <div className={styles.PriorityModalContent}>
                                    <SelectInputs.Select id="priority" name="priority" label="Priority:" hideLabel>
                                        <option value={RequestPriority.Normal}>
                                            {capitalizeFirstLetter(RequestPriority.Normal)}
                                        </option>
                                        <option value={RequestPriority.High}>
                                            {capitalizeFirstLetter(RequestPriority.High)}
                                        </option>
                                        <option value={RequestPriority.Critical}>
                                            {capitalizeFirstLetter(RequestPriority.Critical)}
                                        </option>
                                    </SelectInputs.Select>
                                    <TextArea
                                        label="Reason for Change:"
                                        id="note"
                                        name="note"
                                        placeholder="Enter your reason for changing priority..."
                                        hideLabel
                                        required
                                    />
                                </div>
                            </ModalWithAction>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

