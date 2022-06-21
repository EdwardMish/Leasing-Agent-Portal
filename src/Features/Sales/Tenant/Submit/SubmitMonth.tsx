import submitMonthlySales from 'API/Sales/API/submitMonthlySales';
import ErrorResponse from 'API/utils/ErrorResponse';
import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import Modal from 'Shared/Modal/Modal';
import { ErrorMessage } from '../../../../GlobalMessages';
import { ArrowRightCircle } from '../../../../Icons';
import { SpinningLoader } from '../../../../Icons/Animated';
import { Inputs, useControlledForm } from '../../../../Shared/FormFields';
import { PageWrapper } from '../../../../Shared/PageWrapper';
import { Occupants, Sales } from '../../../../State';
import { currentUserHasPermissionForOccupant } from '../../../../State/CurrentUser/selectors';
import { addSuccessMessage } from '../../../../State/GlobalMessages/actionCreators';
import { SalesSubmittalStatus, UserPermissions } from '../../../../Types';
import { formatCurrencyInput, getRootPath, months } from '../../../../utils';
import { OccupantSummary } from '../../OccupantSummary';
import { ConfirmationModal } from '../ConfirmationModal';

const styles = require('./submit.module.css');

const { Actions, selectors } = Sales;

type Occupant = Occupants.Types.Occupant;

export const SubmitMonth: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { path } = useRouteMatch();

    const target = getRootPath(path, '/sales');

    let { occupantId, year, month } = useParams<{ occupantId: string; year: string; month: string }>();

    const canSubmitSalesForOccupant: boolean = useSelector(
        currentUserHasPermissionForOccupant(UserPermissions.SubmitSales, occupantId),
    );

    const salesLoadedOccupants: number[] = useSelector(selectors.loadedOccupants);

    const { name: occupantName = '', propertyName = '' }: Occupant = useSelector(selectors.salesOccupant(occupantId));

    const occupantsAreLoaded: boolean = useSelector(selectors.salesForOccupantAreLoaded);

    const [salesProcessing, setSalesProcessing] = React.useState<boolean>(false);
    const [showModal, toggleModal] = React.useState<boolean>(false);
    const [resetConfirm, toggleResetConfirm] = React.useState<boolean>(false);
    const [errorMessages, setMessages] = React.useState<
        {
            id: number;
            primaryMessage: string;
            dismiss: (e: any) => void;
        }[]
    >([]);

    const [sales, salesHandler] = useControlledForm();
    const [comment, commentHandler] = useControlledForm();

    const addSalesRecord = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        toggleModal(true);
    };

    const dismissMessage = (id: number) => {
        errorMessages.length === 1 ? setMessages([]) : setMessages(errorMessages.filter((m) => m.id !== id));
    };

    const addErrorMessage = (error: AxiosError) => {
        var response = new ErrorResponse(error);
        const id: number = Date.now();

        setMessages([
            ...errorMessages,
            {
                id,
                primaryMessage: response.message,
                dismiss: (e: React.SyntheticEvent<HTMLDivElement>) => {
                    dismissMessage(id);
                },
            },
        ]);
    };

    const submitSalesRequest = (): void => {
        setSalesProcessing(true);

        const salesAmount: number = formatCurrencyInput(sales);

        submitMonthlySales(occupantId, parseInt(year), parseInt(month), salesAmount, comment)
            .then(() => {
                if (salesLoadedOccupants.includes(parseInt(occupantId))) {
                    dispatch({
                        type: Actions.ADD_MONTHLY_SUBMITTAL,
                        payload: {
                            occupantId,
                            submittal: {
                                year: parseInt(year),
                                salesAmount,
                                // TODO: Match for message expectation
                                comment,
                                status: SalesSubmittalStatus.pending,
                                month: parseInt(month),
                            },
                        },
                    });
                }

                setSalesProcessing(false);
                dispatch(addSuccessMessage(`Sales added for ${months[month]}, ${year}`));

                history.push(`${target}/${occupantId}?year=${year}`);
            })
            .catch((err) => {
                addErrorMessage(err);
                toggleResetConfirm(true);
                setSalesProcessing(false);
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
                <PageWrapper pageTitle={`Sales | ${occupantName} - Submit`} breadCrumbs={breadCrumbs}>
                    {occupantsAreLoaded && (
                        <>
                            <OccupantSummary occupantName={occupantName} propertyName={propertyName} />
                            <p className={styles.SubmitMonthAndYear}>{`${months[month]}, ${year}`}</p>
                            <form className={styles.SubmitForm} onSubmit={addSalesRecord}>
                                <Inputs.Currency
                                    id="tenant-submit-sales"
                                    name="Enter Sales"
                                    value={sales}
                                    handler={salesHandler}
                                    required
                                    formRow
                                />
                                <button className={styles.NextButton}>
                                    <span>Next</span> <ArrowRightCircle />
                                </button>
                                <span className={styles.LegalText}>
                                    By continuing, Tenant represents and warrants to Landlord that the gross sales reported
                                    are accurate for the time period identified.
                                </span>
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
                                        comment={comment}
                                        commentHandler={commentHandler}
                                        requireCommentForLowSales
                                    />
                                    {salesProcessing && (
                                        <div className={styles.Submitting}>
                                            <span className={styles.SubmittingSpinner}>
                                                <SpinningLoader aspect="1rem" /> Submitting, please wait.
                                            </span>
                                        </div>
                                    )}
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

