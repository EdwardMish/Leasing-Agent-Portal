import addNoteToSales from 'API/Sales/API/addNoteToSales';
import approveSales from 'API/Sales/API/approveSales';
import declineSales from 'API/Sales/API/declineSales';
import requestSales from 'API/Sales/API/requestSales';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'Shared/Modal/Modal';
import { RecordStatus } from '../../..';
import { Add, ChevronDown, ChevronUp, Remove, Send, Success } from '../../../../../Icons';
import { globalMessageActions, Sales } from '../../../../../State';
import { addErrorMessage } from '../../../../../State/GlobalMessages/actionCreators';
import { InterfaceMessageTypes, Note, SalesSubmittalByMonth, SalesSubmittalStatus } from '../../../../../Types';
import { formatCurrency, months } from '../../../../../utils';
import { Inputs, useControlledForm } from '../../../../FormFields';
import { IconWithText } from '../../../../PageElements';
import { TabStatesWithComponent } from '../../../../TabStates';

const tableStyles = require('../../sales-table.module.css');
const styles = require('../admin-sales-table.module.css');

interface AdminSalesRowProps {
    occupantId: number | string;
    submittalByMonth: SalesSubmittalByMonth;
    year: number;
    canAdmin: boolean;
    canRequestSales: boolean;
}

const { Actions } = Sales;

export const AdminSalesRow: React.FC<AdminSalesRowProps> = ({
    canAdmin,
    occupantId,
    submittalByMonth,
    year,
    canRequestSales = false,
}) => {
    const dispatch = useDispatch();

    const { month, submittal } = submittalByMonth;

    const [declineComment, handler, forceDeclineValue] = useControlledForm();
    const [addNote, addNoteHandler, forceAddValue] = useControlledForm();

    const [showNotes, toggleNotes] = React.useState<boolean>(false);
    const [showAddNote, toggleAddNote] = React.useState<boolean>(false);
    const [currentStatus, setCurrentStatus] = React.useState<SalesSubmittalStatus | undefined>();
    const [validateDecline, toggleDecline] = React.useState<boolean>(false);
    const [currentDetailView, setCurrentDetailView] = React.useState<number>(0);
    const [salesRequested, toggleSalesRequested] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (submittalByMonth && submittalByMonth.submittal) {
            setCurrentStatus(submittalByMonth.submittal.status);
        }
    }, [submittalByMonth]);

    const declineItem = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const cacheStatus = currentStatus;
        setCurrentStatus(undefined);

        if (month) {
            const m = typeof month === 'string' ? parseInt(month) : month;

            declineSales(occupantId, year, month, declineComment)
                .then(() => {
                    setCurrentStatus(SalesSubmittalStatus.declined);
                    toggleDecline(false);

                    dispatch({
                        type: Actions.UPDATE_SUBMITTAL_STATUS,
                        payload: {
                            occupantId,
                            year,
                            month: m,
                            status: SalesSubmittalStatus.declined,
                        },
                    });

                    dispatch({
                        type: Actions.ADD_NOTE_TO_SALES,
                        payload: {
                            occupantId,
                            year,
                            month: m,
                            note: {
                                text: declineComment,
                                id: 1000,
                                commenterName: '',
                            },
                        },
                    });

                    forceDeclineValue('');
                })
                .catch(() => {
                    setCurrentStatus(cacheStatus);
                    dispatch(addErrorMessage('We were not able to decline the sales submission.'));
                });
        }
    };

    const approve = (e) => {
        e.preventDefault();

        const cacheStatus = currentStatus;
        setCurrentStatus(undefined);

        if (month) {
            const m = typeof month === 'string' ? parseInt(month) : month;

            approveSales(occupantId, year, month)
                .then(() => {
                    setCurrentStatus(SalesSubmittalStatus.approved);
                    toggleDecline(false);

                    dispatch({
                        type: Actions.UPDATE_SUBMITTAL_STATUS,
                        payload: {
                            occupantId,
                            year,
                            month: m,
                            status: SalesSubmittalStatus.approved,
                        },
                    });
                })
                .catch((error) => {
                    setCurrentStatus(cacheStatus);
                    dispatch(addErrorMessage('We were not able to approve the sales submission.'));
                });
        }
    };

    const decline = (e) => {
        e.preventDefault();
        toggleDecline(true);
    };

    const addNoteToItem = (e) => {
        e.preventDefault();

        if (month) {
            const m = typeof month === 'string' ? parseInt(month) : month;

            addNoteToSales(occupantId, year, month, addNote)
                .then(() => {
                    dispatch({
                        type: Actions.ADD_NOTE_TO_SALES,
                        payload: {
                            occupantId,
                            year,
                            month: m,
                            note: {
                                text: addNote,
                                id: 1000,
                                commenterName: '',
                            },
                        },
                    });

                    dispatch({
                        type: globalMessageActions.GlobalMessagesActions.ADD_MESSAGE,
                        payload: {
                            message: 'Your notes was successfully added.',
                            messageType: InterfaceMessageTypes.SUCCESS,
                        },
                    });

                    toggleAddNote(false);
                    forceAddValue('');
                })
                .catch(() => {
                    dispatch({
                        type: globalMessageActions.GlobalMessagesActions.ADD_MESSAGE,
                        payload: {
                            message: 'We were not able to add the note to the sales submission.',
                            messageType: InterfaceMessageTypes.ERROR,
                        },
                    });
                });
        }
    };

    const sendNotification = (e: React.SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        toggleSalesRequested(true);

        requestSales(occupantId, year, month)
            .then(() => {
                dispatch({
                    type: globalMessageActions.GlobalMessagesActions.ADD_MESSAGE,
                    payload: {
                        message: 'Your request has been sent.',
                        messageType: InterfaceMessageTypes.SUCCESS,
                    },
                });
            })
            .catch(() => {
                dispatch({
                    type: globalMessageActions.GlobalMessagesActions.ADD_MESSAGE,
                    payload: {
                        message: 'Your request failed to send.',
                        messageType: InterfaceMessageTypes.ERROR,
                    },
                });

                toggleSalesRequested(false);
            });
    };

    const detailsCallback = (val: number) => {
        setCurrentDetailView(0);
    };

    const notesCallback = (val: number) => {
        setCurrentDetailView(1);
    };

    const tabs = [
        { name: 'Details', callBack: detailsCallback },
        { name: `Notes: (${submittal?.notes?.length || 0})`, callBack: notesCallback },
    ];

    return (
        <>
            <div className={tableStyles.Record} key={`tenant-sales-${month}`}>
                <p className={`${tableStyles.Month} ${styles.AdminMonth}`}>{months[month]}</p>
                <p className={styles.AdminAmount}>{`${submittal ? formatCurrency(submittal.salesAmount, 0.01) : '--'}`}</p>
                {canAdmin && (
                    <div className={styles.AdminActions}>
                        {submittal ? (
                            <>
                                {' '}
                                {currentStatus === SalesSubmittalStatus.pending.toLowerCase() ? (
                                    <>
                                        <button onClick={approve} className={styles.ButtonComplete}>
                                            <Success />
                                        </button>
                                        <button onClick={decline} className={styles.ButtonDecline}>
                                            <Remove />
                                        </button>
                                    </>
                                ) : null}
                            </>
                        ) : (
                            !salesRequested &&
                            canRequestSales &&
                            new Date(year, parseInt(month) - 1, 1) >
                                new Date(new Date().setFullYear(new Date().getFullYear() - 5)) && (
                                <button onClick={sendNotification} className={styles.ButtonSendRequest}>
                                    Request Sales
                                    <Send />
                                </button>
                            )
                        )}
                    </div>
                )}
                <div className={styles.AdminStatus}>
                    {submittal ? <RecordStatus status={currentStatus} /> : <p>Missing</p>}
                </div>
                {submittal ? (
                    <div className={styles.AdminNotes}>
                        <p>{submittal.notes.length}</p>
                    </div>
                ) : (
                    <div className={styles.AdminNotes} />
                )}
                {submittal ? (
                    <div
                        className={styles.DetailIcon}
                        onClick={() => {
                            toggleNotes(!showNotes);
                        }}
                    >
                        {showNotes ? <ChevronUp /> : <ChevronDown />}
                    </div>
                ) : (
                    <div className={styles.DetailIcon} />
                )}
            </div>
            {showNotes && submittal && (
                <div className={styles.Details}>
                    <div className={styles.DetailsHeader}>
                        <TabStatesWithComponent tabs={tabs} withMargin={false}>
                            <div
                                onClick={() => {
                                    toggleAddNote(true);
                                }}
                            >
                                <IconWithText Icon={Add} text="Add Note" />
                            </div>
                        </TabStatesWithComponent>
                    </div>
                    {currentDetailView === 0 ? (
                        <div className={styles.DetailsPanel}>
                            <p>Submitted By:</p>
                            <p>{submittal.submittedBy}</p>
                            <p>Last Modified By:</p>
                            <p>{submittal.lastModifiedBy}</p>
                        </div>
                    ) : (
                        <>
                            {submittal.notes.map(({ commenterName, id, text }: Note) => (
                                <div key={`sales-record-${id}`} className={styles.Note}>
                                    <p>{commenterName}</p>
                                    <p>{text}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
            {validateDecline && (
                <Modal header="Add Note" callBack={() => toggleDecline(false)}>
                    <div className={styles.AddNoteToDecline}>
                        <form onSubmit={declineItem}>
                            <Inputs.TextArea
                                id="decline-submittal-add-note"
                                name="Add Note for Decline"
                                value={declineComment}
                                handler={handler}
                                required
                                formRow
                            />
                            <button className={styles.ModalButton}>Decline Sales</button>
                        </form>
                    </div>
                </Modal>
            )}
            {showAddNote && (
                <Modal header="Add Note" callBack={() => toggleAddNote(false)}>
                    <div className={styles.AddNote}>
                        <form onSubmit={addNoteToItem}>
                            <Inputs.TextArea
                                id="add-note"
                                name="Add Note"
                                value={addNote}
                                handler={addNoteHandler}
                                required
                                formRow
                            />
                            <button className={styles.ModalButton}>Add Note</button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    );
};

