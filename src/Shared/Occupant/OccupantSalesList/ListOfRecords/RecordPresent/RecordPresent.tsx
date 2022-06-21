import approveSales from 'API/Sales/API/approveSales';
import declineSales from 'API/Sales/API/declineSales';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Shared/Modal/Modal';
import { RecordStatus } from '../../../../Sales';
import { CurrentUserState, Sales } from '../../../../../State';
import { addErrorMessage } from '../../../../../State/GlobalMessages/actionCreators';
import { SalesSubmittal, SalesSubmittalStatus } from '../../../../../Types';
import { Inputs, useControlledForm } from '../../../../FormFields';
import { OOActions } from './OOActions/OOActions';

import listStyles = require('../list-of-records.module.css');

interface RecordPresentProps {
    month: string;
    occupantId: number | string;
    salesSubmittal: SalesSubmittal;
}

const formattedCurrency = (submittalAmount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(submittalAmount * 0.01);

const { Actions } = Sales;

const RecordPresent: React.FC<RecordPresentProps> = ({ month, occupantId, salesSubmittal }) => {
    const { month: submittalMonth, year } = salesSubmittal;

    const dispatch = useDispatch();

    const currentUserIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);
    const currentUserRoles: string[] = useSelector(CurrentUserState.selectors.currentUserRoles);

    const [declineComment, handler] = useControlledForm();

    const [currentStatus, setCurrentStatus] = React.useState<SalesSubmittalStatus | undefined>();
    const [validateDecline, toggleDecline] = React.useState<boolean>(false);

    const declineItem = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const cacheStatus = currentStatus;
        setCurrentStatus(undefined);

        if (submittalMonth) {
            declineSales(occupantId, year, submittalMonth, declineComment)
                .then(() => {
                    setCurrentStatus(SalesSubmittalStatus.declined);
                    toggleDecline(false);

                    dispatch({
                        type: Actions.UPDATE_SUBMITTAL_STATUS,
                        payload: {
                            occupantId,
                            year,
                            month: submittalMonth,
                            status: SalesSubmittalStatus.declined,
                        },
                    });
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

        if (submittalMonth) {
            approveSales(occupantId, year, submittalMonth)
                .then(() => {
                    setCurrentStatus(SalesSubmittalStatus.approved);
                    toggleDecline(false);

                    dispatch({
                        type: Actions.UPDATE_SUBMITTAL_STATUS,
                        payload: {
                            occupantId,
                            year,
                            month: submittalMonth,
                            status: SalesSubmittalStatus.approved,
                        },
                    });
                })
                .catch(() => {
                    setCurrentStatus(cacheStatus);

                    dispatch(addErrorMessage('We were not able to approve the sales submission.'));
                });
        }
    };

    const decline = (e) => {
        e.preventDefault();
        toggleDecline(true);
    };

    return (
        <div className={listStyles.Record}>
            <p>{month}</p>
            <p className={listStyles.SalesAmount}>{formattedCurrency(salesSubmittal.salesAmount)}</p>
            {currentUserIsTenant ? (
                <RecordStatus status={currentStatus} />
            ) : currentUserRoles.includes('ooAdmin') || currentUserRoles.includes('ooSalesCoordinator') ? (
                <OOActions approve={approve} decline={decline} status={salesSubmittal.status} />
            ) : (
                <RecordStatus status={currentStatus} />
            )}
            {validateDecline && (
                <Modal header="Add Note" callBack={() => toggleDecline(false)}>
                    <div className={listStyles.AddNoteToDecline}>
                        <form onSubmit={declineItem}>
                            <Inputs.TextArea
                                id="decline-submittal-add-note"
                                name="Add Note for Decline"
                                value={declineComment}
                                handler={handler}
                                required
                                formRow
                            />
                            <button type="submit" className={listStyles.SubmitDecline}>
                                Decline Sales
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default RecordPresent;
