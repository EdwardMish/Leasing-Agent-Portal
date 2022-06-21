import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import * as Yup from 'yup';
import Inspections from '../../../API/Inspections';
import { TextArea } from '../../../Shared/Forms';
import { CurrentUserState, globalMessageActionCreators } from '../../../State';
import { Actions, ActionTypes } from '../../../State/Inspections/Feature';
import { InspectionComment } from '../../../State/Inspections/Types/InspectionComment';

const ReplyToComment: React.FC<{
    parent: InspectionComment | null;
    showModal: boolean;
    closeCallback: () => void;
}> = ({ parent, showModal, closeCallback }) => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const dispatch = useDispatch();

    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);

    const addReply = ({ noteText }: { noteText: string }, { setSubmitting }) => {
        if (!parent) return;

        Inspections.addComment(inspectionId, noteText, parent.id)
            .then(({ commentId: id }: { commentId: number }) => {
                dispatch({
                    type: Actions.ADD_COMMENT,
                    payload: {
                        inspectionId,
                        comment: {
                            id,
                            createdDate: new Date().toLocaleString(),
                            commenterName: `${currentUser.firstName} ${currentUser.lastName}`,
                            noteText,
                            parent: parent.id,
                        },
                    },
                } as ActionTypes);
                setSubmitting(false);

                closeCallback();
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        'We could not add the comment at this time. Please try again.',
                    ),
                );
                setSubmitting(false);

                closeCallback();
            });
    };

    return (
        <>
            {showModal && !!parent ? (
                <Formik
                    initialValues={{
                        noteText: '',
                    }}
                    onSubmit={addReply}
                    validationSchema={Yup.object({
                        noteText: Yup.string()
                            .required('A reply requires at least 5 characters.')
                            .min(5, 'A reply must be at least 5 characters.'),
                    })}
                >
                    {({ isSubmitting, handleSubmit }) => (
                        <Form>
                            <ModalWithAction
                                header="Reply to a comment"
                                actionText="Add Reply"
                                disable={isSubmitting}
                                actionCallback={handleSubmit}
                                cancelCallback={closeCallback}
                            >
                                <div style={{ padding: '1rem' }}>
                                    <div>
                                        <p>
                                            <b>Responding to:</b>
                                        </p>
                                        <p style={{ margin: '0 0 0.75rem', lineHeight: '1.45' }}>{parent.noteText}</p>
                                        <p style={{ margin: '0 0 0.75rem' }}>
                                            <i>{`${parent.commenterName} - ${format(
                                                new Date(parent.createdDate),
                                                'LL/dd/yy',
                                            )}`}</i>
                                        </p>
                                    </div>

                                    <TextArea id="noteText" name="noteText" label="Reply" hideLabel={true} />
                                </div>
                            </ModalWithAction>
                        </Form>
                    )}
                </Formik>
            ) : null}
        </>
    );
};

export default ReplyToComment;

