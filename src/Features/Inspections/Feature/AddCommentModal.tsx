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

const AddComment: React.FC<{
    showModal: boolean;
    closeCallback: () => void;
}> = ({ showModal, closeCallback }) => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const dispatch = useDispatch();

    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);

    const addComment = ({ noteText }: { noteText: string }, { setSubmitting }) => {
        Inspections.addComment(inspectionId, noteText, null)
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
                            parent: 0,
                        },
                    },
                } as ActionTypes);

                setSubmitting(false);

                closeCallback();
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        'We could not add your comment at this time. Please try again.',
                    ),
                );

                setSubmitting(false);

                closeCallback();
            });
    };

    return (
        <>
            {showModal ? (
                <Formik
                    initialValues={{
                        noteText: '',
                    }}
                    onSubmit={addComment}
                    validationSchema={Yup.object({
                        noteText: Yup.string()
                            .required('A comment requires at least 5 characters.')
                            .min(5, 'A comment must be at least 5 characters.'),
                    })}
                >
                    {({ isSubmitting, handleSubmit }) => (
                        <Form>
                            <ModalWithAction
                                header="Add a Comment"
                                actionText="Add Comment"
                                disable={isSubmitting}
                                actionCallback={handleSubmit}
                                cancelCallback={closeCallback}
                            >
                                <div style={{ padding: '1rem' }}>
                                    <TextArea id="noteText" name="noteText" label="Comment" hideLabel={true} />
                                </div>
                            </ModalWithAction>
                        </Form>
                    )}
                </Formik>
            ) : null}
        </>
    );
};

export default AddComment;

