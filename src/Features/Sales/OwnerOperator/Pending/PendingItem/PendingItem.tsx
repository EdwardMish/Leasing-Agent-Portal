import getOccupantSales from 'API/Occupant/OccupantAPI/getOccupantSales';
import addNoteToSales from 'API/Sales/API/addNoteToSales';
import approveSales from 'API/Sales/API/approveSales';
import declineSales from 'API/Sales/API/declineSales';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'Shared/Modal/Modal';
import { Add, ChevronDown, ChevronUp, IconColors, Printer, Remove, Success } from '../../../../../Icons';
import { Inputs, useControlledForm } from '../../../../../Shared/FormFields';
import { PrintTargetOccupantDetail } from '../../../../../Shared/Occupant/PrintOccupantSales';
import { IconWithText } from '../../../../../Shared/PageElements';
import { TabStates } from '../../../../../Shared/TabStates';
import { CurrentUserState, Sales } from '../../../../../State';
import { addErrorMessage, addSuccessMessage } from '../../../../../State/GlobalMessages/actionCreators';
import { Note, PendingSalesSubmittal, SalesSubmittal, SalesSubmittalStatus } from '../../../../../Types';
import { formatCurrency, formatDate, months, monthsNumeric } from '../../../../../utils';
import { OccupantSummary } from '../../../OccupantSummary';

const styles = require('./pending-item.module.css');

interface PendingItemProps {
    pendingSubmittal: PendingSalesSubmittal;
    removeItem: (occupantId: number, year: number, month: number) => void;
}

const { selectors: salesSelectors, Actions: salesActions } = Sales;

export const PendingItem: React.FC<PendingItemProps> = ({ pendingSubmittal, removeItem }) => {
    const dispatch = useDispatch();

    const { occupantId, occupantName, propertyName, propertyId, month, year, salesAmount, notes, submittedBy } =
        pendingSubmittal;

    const [declineComment, handler, forceDeclineValue] = useControlledForm();
    const [addNote, addHandler, forceAddValue] = useControlledForm();

    const [detailsExpanded, toggleDetails] = React.useState<boolean>(false);
    const [currentStatus, setCurrentStatus] = React.useState<SalesSubmittalStatus | undefined>(SalesSubmittalStatus.pending);
    const [printView, togglePrintView] = React.useState<boolean>(false);
    const [validateDecline, toggleDecline] = React.useState<boolean>(false);
    const [optimisticStatusList, setStatusList] = React.useState<SalesSubmittal[]>([]);
    const [salesSummaryView, setSalesSummaryView] = React.useState<number>(0);
    const [addNoteView, toggleAddNote] = React.useState<boolean>(false);
    const [submittalNotes, setSubmittalNotes] = React.useState<Note[]>(notes);

    const loadedOccupants: number[] = useSelector(salesSelectors.loadedOccupants);
    const occupantSales: SalesSubmittal[] = useSelector(salesSelectors.salesForOccupant(occupantId));
    const printRef = React.useRef<HTMLDivElement>(null);
    const currentUserFullName: string = useSelector(CurrentUserState.selectors.currentUserFullName);

    React.useEffect(() => {
        if (!loadedOccupants.includes(occupantId)) {
            dispatch({
                type: salesActions.LOAD_OCCUPANT_SALES,
                payload: occupantId,
            });

            getOccupantSales(occupantId).then((res) => {
                dispatch({
                    type: salesActions.SET_OCCUPANT_SALES,
                    payload: {
                        occupantId,
                        submittals: res,
                    },
                });
            });
        }
    }, [loadedOccupants]);

    React.useEffect(() => {
        setSubmittalNotes(notes);
    }, [notes]);

    const showStatus = () => {
        if (!currentStatus) {
            return <p className={`${styles.CurrentStatus} ${styles.CurrentStatusProcessing}`}>Loading</p>;
        }

        if (currentStatus === SalesSubmittalStatus.approved) {
            return <p className={`${styles.CurrentStatus} ${styles.CurrentStatusApproved}`}>{`Status: ${currentStatus}`}</p>;
        }

        if (currentStatus === SalesSubmittalStatus.declined) {
            return <p className={`${styles.CurrentStatus} ${styles.CurrentStatusDeclined}`}>{`Status: ${currentStatus}`}</p>;
        }

        return <p className={styles.CurrentStatus}>{`Status: ${currentStatus}`}</p>;
    };

    const print = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStatusList(occupantSales.filter((s: SalesSubmittal) => s.year === year));
        togglePrintView(true);
    };

    const approveItem = () => {
        const cacheStatus = currentStatus;
        setCurrentStatus(undefined);

        approveSales(occupantId, year, month)
            .then(() => {
                setCurrentStatus(SalesSubmittalStatus.approved);

                dispatch({
                    type: salesActions.UPDATE_SUBMITTAL_STATUS,
                    payload: {
                        occupantId: occupantId,
                        year,
                        month,
                        status: SalesSubmittalStatus.approved,
                    },
                });

                completeItem();
            })
            .catch(() => {
                setCurrentStatus(cacheStatus);

                dispatch(addErrorMessage('We were not able to approve the sales submission. Please try again.'));
            });
    };

    const declineItem = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const cacheStatus = currentStatus;
        setCurrentStatus(undefined);

        declineSales(occupantId, year, month, declineComment)
            .then(() => {
                setCurrentStatus(SalesSubmittalStatus.declined);
                toggleDecline(false);

                dispatch({
                    type: salesActions.UPDATE_SUBMITTAL_STATUS,
                    payload: {
                        occupantId: occupantId,
                        year,
                        month,
                        status: SalesSubmittalStatus.approved,
                    },
                });

                completeItem();
                forceDeclineValue('');
            })
            .catch(() => {
                setCurrentStatus(cacheStatus);

                dispatch(addErrorMessage('We were not able to decline the sales submission. Please try again.'));
            });
    };

    const addNoteToItem = (e) => {
        e.preventDefault();

        if (month) {
            const m = typeof month === 'string' ? parseInt(month) : month;

            addNoteToSales(occupantId, year, month, addNote)
                .then(() => {
                    dispatch({
                        type: salesActions.ADD_NOTE_TO_SALES,
                        payload: {
                            occupantId,
                            year,
                            month: m,
                            note: {
                                text: addNote,
                                id: 1000,
                                commenterName: currentUserFullName,
                                created: new Date().toISOString(),
                            },
                        },
                    });

                    dispatch(addSuccessMessage('Your note was successfully added.'));

                    toggleAddNote(false);
                    forceAddValue('');
                    setSubmittalNotes([
                        ...submittalNotes,
                        {
                            text: addNote,
                            id: 1000,
                            commenterName: currentUserFullName,
                            created: new Date().toISOString(),
                        },
                    ]);
                })
                .catch(() => {
                    dispatch(addErrorMessage('We were not able to add the note to the sales submission.'));
                });
        }
    };

    const renderThreeMonths = () => {
        const displayMonths = [month - 1, month - 2, month - 3];

        return (
            <ul>
                {displayMonths.map((m: number) => {
                    const computedMonth: number = m > 0 ? m : m + 12;
                    const computedYear: number = m > 0 ? year : year - 1;

                    const salesRecord = occupantSales.find(
                        (sales) => sales.year === computedYear && sales.month === computedMonth,
                    )?.salesAmount;
                    const amount = (salesRecord && formatCurrency(salesRecord, 0.01)) || '--';

                    return (
                        <li key={`previous-month-sales-${m}`}>
                            <p>{`${monthsNumeric[computedMonth]}/${computedYear}`}</p>
                            <p>{amount}</p>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const completeItem = () => {
        removeItem(occupantId, year, month);
    };

    const printWindow = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (typeof window != 'undefined') {
            window.print();
        }
    };

    const tabs = [
        {
            name: 'History',
            callBack: () => {
                setSalesSummaryView(0);
            },
        },
        {
            name: `Notes (${submittalNotes.length})`,
            callBack: () => {
                setSalesSummaryView(1);
            },
        },
    ];

    return (
        <div className={styles.PendingItem}>
            <div className={styles.PendingItemHeading} onClick={() => toggleDetails(!detailsExpanded)}>
                <div className={styles.HeadingOverview}>
                    <div className={styles.HeadingOccupantAndProperty}>
                        <p>{occupantName}</p>
                        <p>{propertyName}</p>
                    </div>
                    <p>{`${month && monthsNumeric[month] + '/'}${year}`}</p>
                    <p>{formatCurrency(salesAmount, 0.01)}</p>
                    <div className={styles.HeadingOverviewNotesCount}>
                        <p className={!!notes.length ? styles.HasNotes : ''}>{notes.length}</p>
                    </div>
                </div>
                <div>{detailsExpanded ? <ChevronUp /> : <ChevronDown />}</div>
            </div>
            {detailsExpanded && (
                <div className={styles.PendingItemContent}>
                    <div className={styles.PendingItemContentHeader}>
                        <div className={styles.PendingItemContentOccupantSummary}>
                            <OccupantSummary occupantName={occupantName} propertyName={propertyName} />
                            <p className={styles.OccupantSummarySubmitted}>{`Submitted By: ${submittedBy}`}</p>
                            <Link to={`locations/${propertyId}/occupants/${occupantId}/sales?year=${year}`}>
                                View Sales Details
                            </Link>
                        </div>
                        <div className={styles.PendingItemPanel}>
                            {showStatus()}
                            <div className={styles.PendingItemShortcuts}>
                                <button
                                    className={`${styles.Button} ${styles.ButtonDecline}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleDecline(true);
                                    }}
                                >
                                    <span>Decline</span>
                                    <Remove />
                                </button>
                                <button className={`${styles.Button} ${styles.ButtonPrint}`} onClick={print}>
                                    <span>Print</span>
                                    <Printer />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.PendingItemContentSummary}>
                        <div className={styles.PendingItemContentSummaryTable}>
                            <TabStates tabs={tabs} withMargin={false} />
                            {salesSummaryView === 0 ? (
                                renderThreeMonths()
                            ) : (
                                <>
                                    <div className={styles.PendingItemNoteHeader}>
                                        <div
                                            onClick={() => {
                                                toggleAddNote(true);
                                            }}
                                        >
                                            <IconWithText Icon={Add} text="Add Note" />
                                        </div>
                                    </div>
                                    {submittalNotes.map((n: Note) => (
                                        <div key={`item-note-${n.id}`} className={styles.PendingItemNote}>
                                            <p>{n.text}</p>
                                            <p>{n.commenterName}</p>
                                            <p>{n.created ? formatDate(n.created) : ''}</p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className={styles.PendingItemContentSummaryPanel}>
                            <p className={styles.Amount}>{formatCurrency(salesAmount, 0.01)}</p>
                            <p className={styles.MonthAndYear}>{`${month && months[month] + ', '}${year}`}</p>
                            <button className={`${styles.Button} ${styles.ButtonComplete}`} onClick={approveItem}>
                                <span>Approve </span> <Success />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {printView && (
                <Modal header="Neighbor Detail" callBack={() => togglePrintView(false)}>
                    <div ref={printRef} className={`print-ignore ${styles.PrintTargetHeading}`}>
                        <div onClick={approveItem}>
                            <IconWithText Icon={Success} text="Approve" color={IconColors.White} />
                        </div>
                        <div onClick={printWindow}>
                            <IconWithText Icon={Printer} text="Print Details" color={IconColors.White} />
                        </div>
                    </div>
                    <PrintTargetOccupantDetail
                        occupantName={occupantName}
                        propertyName={propertyName}
                        year={year}
                        salesSubmittals={optimisticStatusList}
                    />
                </Modal>
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
                            {
                                // TODO: Uses 'Next Button' styles from Submit Tenant Sales Flow
                            }
                            <button className={styles.SubmitDecline}>Decline Sales</button>
                        </form>
                    </div>
                </Modal>
            )}
            {addNoteView && (
                <Modal header="Add Note" callBack={() => toggleAddNote(false)}>
                    <div className={styles.AddNote}>
                        <form onSubmit={addNoteToItem}>
                            <Inputs.TextArea
                                id="add-note"
                                name="Add Note"
                                value={addNote}
                                handler={addHandler}
                                required
                                formRow
                            />
                            <button className={styles.ModalButton}>Add Note</button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

