import resubmitMonthlySales from 'API/Sales/API/resubmitMonthlySales';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import Modal from 'Shared/Modal/Modal';
import { ErrorMessage } from '../../../../GlobalMessages';
import { ArrowRightCircle } from '../../../../Icons';
import { Inputs, useControlledForm } from '../../../../Shared/FormFields';
import { PageWrapper } from '../../../../Shared/PageWrapper';
import { Occupants, Sales } from '../../../../State';
import { currentUserHasPermissionForOccupant } from '../../../../State/CurrentUser/selectors';
import { addSuccessMessage } from '../../../../State/GlobalMessages/actionCreators';
import { Note, SalesSubmittal, SalesSubmittalStatus, UserPermissions } from '../../../../Types';
import { formatCurrency, formatCurrencyInput, getRootPath, months } from '../../../../utils';
import { OccupantSummary } from '../../OccupantSummary';
import { ConfirmationModal } from '../ConfirmationModal';

const styles = require('../Submit/submit.module.css');

const { Actions, selectors } = Sales;

type Occupant = Occupants.Types.Occupant;

export const Resubmit: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    let { path } = useRouteMatch();
    let { occupantId, year, month } = useParams<{ occupantId: string; year: string; month: string }>();

    const canSubmitSalesForOccupant: boolean = useSelector(
        currentUserHasPermissionForOccupant(UserPermissions.SubmitSales, occupantId),
    );

    const target = getRootPath(path, '/sales');

    const salesRecord: SalesSubmittal = useSelector(selectors.salesSubmittal(occupantId, month, year));
    const { name: occupantName = '', propertyName = '' }: Occupant = useSelector(selectors.salesOccupant(occupantId));
    const occupantsAreLoaded: boolean = useSelector(selectors.salesForOccupantAreLoaded);

    const [showModal, toggleModal] = React.useState<boolean>(false);
    const [resetConfirm, toggleResetConfirm] = React.useState<boolean>(false);
    const [errorMessages, setMessages] = React.useState<
        {
            id: number;
            primaryMessage: string;
            dismiss: (e: any) => void;
        }[]
    >([]);
    const [errComment, setCommentErr] = React.useState(false);

    const [sales, salesHandler] = useControlledForm();
    const [comment, commentHandler] = useControlledForm();

    const addSalesRecord = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!comment.replace(/\s/g, '').length) setCommentErr(true);
        else {
            setCommentErr(false);
            toggleModal(true);
        }
    };

    const dismissMessage = (id: number) => {
        errorMessages.length === 1 ? setMessages([]) : setMessages(errorMessages.filter((m) => m.id !== id));
    };

    const addErrorMessage = (error: any) => {
        const { response } = error;

        const id: number = Date.now();

        setMessages([
            ...errorMessages,
            {
                id,
                primaryMessage: response.data.message,
                dismiss: (e: React.SyntheticEvent<HTMLDivElement>) => {
                    dismissMessage(id);
                },
            },
        ]);
    };

    const submitSalesRequest = (): void => {
        const salesAmount: number = formatCurrencyInput(sales);

        resubmitMonthlySales(occupantId, parseInt(year), parseInt(month), salesAmount, comment)
            .then(() => {
                dispatch({
                    type: Actions.UPDATE_SUBMITTAL,
                    payload: {
                        occupantId,
                        year: parseInt(year),
                        salesAmount,
                        // TODO: Match for message expectation
                        comment,
                        status: SalesSubmittalStatus.pending,
                        month: parseInt(month),
                    },
                });

                dispatch(addSuccessMessage(`Sales resubmitted for ${months[month]}, ${year}`));

                history.push(`${target}/${occupantId}?year=${year}`);
            })
            .catch((err) => {
                toggleResetConfirm(true);
                addErrorMessage(err);
            });
    };

    const breadCrumbs = {
        current: 'Submit',
        routes: [
            {
                target: `${target}`,
                display: 'Sales',
            },
            {
                target: `${target}/${occupantId}?year=${year}`,
                display: `${occupantName}`,
            },
        ],
    };

    return (
        <>
            {canSubmitSalesForOccupant ? (
                <PageWrapper pageTitle={`Sales | ${occupantName} - Resubmit`} breadCrumbs={breadCrumbs}>
                    {occupantsAreLoaded && salesRecord && (
                        <>
                            <OccupantSummary occupantName={occupantName} propertyName={propertyName} />
                            <p className={styles.ResubmitMonthAndYear}>{`${months[month]}, ${year}`}</p>
                            <p className={styles.PreviousSubText}>Previous Sales Amount:</p>
                            <p className={styles.PreviousAmount}>{formatCurrency(salesRecord.salesAmount, 0.01)}</p>
                            {!!salesRecord.notes && !!salesRecord.notes.length && (
                                <div className={styles.CommentsWrapper}>
                                    <h3>Notes:</h3>
                                    {salesRecord.notes.map(({ commenterName, id, text }: Note) => (
                                        <div key={`sales-record-${id}`} className={styles.CommentRow}>
                                            <p>{`Author: ${commenterName}`}</p>
                                            <p>{text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <form onSubmit={addSalesRecord}>
                                <Inputs.Currency
                                    id="tenant-resubmit-sales"
                                    name="Enter Sales"
                                    value={sales}
                                    handler={salesHandler}
                                    required
                                    formRow
                                />
                                <Inputs.TextArea
                                    id="tenant-resubmit-comment"
                                    name="Tell us the reason for resubmitting sales"
                                    value={comment}
                                    handler={commentHandler}
                                    required
                                    formRow
                                />
                                {errComment && <p className={styles.Error}>Please enter a comment</p>}
                                <button className={styles.NextButton}>
                                    <span>Next</span> <ArrowRightCircle />
                                </button>
                            </form>
                            {showModal && (
                                <Modal header="Confirm Amount" callBack={() => toggleModal(false)}>
                                    {errorMessages.length > 0 && (
                                        <div className={styles.ErrorMessageWrapper}>
                                            {errorMessages.map((item) => (
                                                <ErrorMessage
                                                    key={`message-${item.id}`}
                                                    primaryMessage={item.primaryMessage}
                                                    dismiss={item.dismiss}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <ConfirmationModal
                                        amount={sales}
                                        month={parseInt(month)}
                                        year={parseInt(year)}
                                        occupantId={parseInt(occupantId)}
                                        confirm={submitSalesRequest}
                                        cancel={() => toggleModal(false)}
                                        resetConfirm={resetConfirm}
                                    />
                                </Modal>
                            )}
                        </>
                    )}
                </PageWrapper>
            ) : (
                <Redirect to="/" />
            )}
        </>
    );
};

