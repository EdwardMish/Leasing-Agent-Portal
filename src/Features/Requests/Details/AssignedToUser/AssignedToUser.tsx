import { RequestsAPI, RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Shared/Modal/Modal';
import { Pencil } from '../../../../Icons';
import { Button } from '../../../../Shared/Button';
import { CurrentUserState, globalMessageActionCreators, Requests } from '../../../../State';
import { AvailableUsers } from './AvailableUsers';
import { ConfirmationModalView } from './Confirmation';

const styles = require('./assigned-to-user.module.css');

interface AssignedToUserProps {
    requestId: number;
    user: Requests.Types.RequestUserSummary | null;
}

export const AssignedToUser: React.FC<AssignedToUserProps> = ({ requestId, user }) => {
    const dispatch = useDispatch();

    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);

    const [pending, togglePending] = React.useState<boolean>(false);
    const [showModal, toggleModal] = React.useState<boolean>(false);
    const [modalViewState, setModalViewState] = React.useState<0 | 1 | 2>(0);

    const closeModal = () => {
        setModalViewState(0);
        toggleModal(false);
    };

    const openUserAssignment = () => {
        setModalViewState(2);
        toggleModal(true);
    };

    const startWorking = () => {
        togglePending(true);

        RequestsAPI.startWorking(requestId)
            .then(() => {
                dispatch({
                    type: Requests.Actions.ASSIGN_USER,
                    payload: {
                        id: requestId,
                        user: {
                            email: currentUser.email,
                            id: currentUser.id,
                            name: `${currentUser.firstName} ${currentUser.lastName}`,
                        },
                    },
                } as Requests.ActionTypes);

                closeModal();
                togglePending(false);
                dispatch(
                    globalMessageActionCreators.addSuccessMessage(
                        `You have successfully started working Request #${requestId}.`,
                    ),
                );
            })
            .catch((err) => {
                togglePending(false);

                if (err.hasOwnProperty('response')) {
                    const { response = {} } = err;

                    if (
                        response.hasOwnProperty('status') &&
                        response.status === 400 &&
                        response.hasOwnProperty('data') &&
                        response.data.hasOwnProperty('name')
                    ) {
                        dispatch(
                            globalMessageActionCreators.addErrorMessage(`Request already assigned to ${response.data.name}`),
                        );
                    } else {
                        dispatch(
                            globalMessageActionCreators.addErrorMessage(`Unable to start working Request #${requestId}.`),
                        );
                    }
                } else {
                    dispatch(globalMessageActionCreators.addErrorMessage(`Unable to start working Request #${requestId}.`));
                }
            });
    };

    const unassignRequest = () => {
        togglePending(true);

        RequestsAPI.unassign(requestId)
            .then(() => {
                dispatch({
                    type: Requests.Actions.ASSIGN_USER,
                    payload: {
                        id: requestId,
                        user: null,
                    },
                } as Requests.ActionTypes);

                togglePending(false);
                closeModal();
                dispatch(globalMessageActionCreators.addSuccessMessage(`Request #${requestId} is now unassigned.`));
            })
            .catch(() => {
                togglePending(false);
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        `We were unable to unassign ${user ? user.name : ''} from Request #${requestId}.`,
                    ),
                );
            });
    };

    const assignToUser = ({ id, name, email }: RequestsTypes.AssigneeResponse) => {
        RequestsAPI.assign(requestId, id)
            .then(() => {
                dispatch({
                    type: Requests.Actions.ASSIGN_USER,
                    payload: {
                        id: requestId,
                        user: {
                            id,
                            name,
                            email,
                        },
                    },
                } as Requests.ActionTypes);

                togglePending(false);
                closeModal();
                dispatch(globalMessageActionCreators.addSuccessMessage(`The Request is now assigned to ${name}.`));
            })
            .catch(() => {
                togglePending(false);
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        `We were not able to assign ${name} to Request ${requestId}.`,
                    ),
                );
            });
    };

    const assignToSelf = () => {
        if (currentUser)
            assignToUser({
                id: currentUser.id,
                name: `${currentUser.firstName} ${currentUser.lastName}`,
                email: currentUser.email,
            } as RequestsTypes.AssigneeResponse);
    };

    const modalViews = (view: 0 | 1 | 2) =>
        ({
            0: (
                <>
                    {user ? (
                        <div className={styles.WorkingModal}>
                            <p>
                                <b>Assignee:</b>
                            </p>
                            <p>{user.name}</p>
                            {user.email && <p className={styles.UserEmail}>{user.email}</p>}
                            {user.id === currentUser.id ? (
                                <Button
                                    callback={unassignRequest}
                                    text="Stop Working"
                                    disable={pending}
                                    lowProfile
                                    withMarginTop
                                    fullWidth
                                />
                            ) : (
                                <Button
                                    callback={() => setModalViewState(1)}
                                    text="Start Working"
                                    disable={pending}
                                    lowProfile
                                    withMarginTop
                                    fullWidth
                                />
                            )}
                            <Button
                                callback={() => setModalViewState(2)}
                                text="Assign a new User"
                                disable={pending}
                                lowProfile
                                withMarginTop
                                fullWidth
                            />
                            {user && user.id !== currentUser.id && (
                                <Button
                                    callback={unassignRequest}
                                    text="Unassign Request"
                                    disable={pending}
                                    lowProfile
                                    withMarginTop
                                    fullWidth
                                    inverse
                                />
                            )}
                        </div>
                    ) : (
                        <>
                            <p>
                                <b>This Request is currently unassigned.</b>
                            </p>
                            <p>Would you like to start working this Request?</p>
                            <Button
                                callback={startWorking}
                                text="Start Working"
                                disable={pending}
                                lowProfile
                                withMarginTop
                                fullWidth
                            />
                            <Button callback={openUserAssignment} text="Assign a User" lowProfile withMarginTop fullWidth />
                        </>
                    )}
                </>
            ),
            1: <ConfirmationModalView callback={assignToSelf} cancelCallback={() => setModalViewState(0)} user={user} />,
            2: (
                <AvailableUsers
                    callback={assignToUser}
                    cancelCallback={() => setModalViewState(0)}
                    requestId={requestId}
                    user={user}
                />
            ),
        }[view]);

    return (
        <>
            {user ? (
                <div className={styles.AssignedToUser}>
                    <div onClick={() => toggleModal(true)} className={styles.EditIcon}>
                        <Pencil />
                    </div>
                    <p>
                        <b>Assignee:</b>
                    </p>
                    <p>{user.name}</p>
                    {user.email && <p className={styles.UserEmail}>{user.email}</p>}
                </div>
            ) : (
                <div className={styles.Unassigned}>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.1rem', marginBottom: '0.35rem' }}>
                        <b>Request is Unassigned</b>
                    </p>
                    <p style={{ lineHeight: '1.5rem', marginBottom: '1rem' }}>Would you like to work this Request?</p>
                    <Button
                        callback={startWorking}
                        text="Start Working"
                        disable={pending}
                        lowProfile
                        withMarginTop
                        fullWidth
                    >
                        Start Working
                    </Button>
                    <Button callback={openUserAssignment} text="Assign a User" lowProfile withMarginTop fullWidth />
                </div>
            )}
            {showModal && (
                <Modal callBack={() => toggleModal(false)} header="Manage Request Assignment">
                    <div className={styles.AssignmentModal}>{modalViews(modalViewState)}</div>
                </Modal>
            )}
        </>
    );
};

