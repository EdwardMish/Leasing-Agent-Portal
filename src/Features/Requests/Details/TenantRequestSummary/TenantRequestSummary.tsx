import { RequestsAPI } from 'API/Requests';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../Shared/Button';
import { Requests } from '../../../../State';
import { RequestStatus } from '../../../../Types';
import { capitalizeFirstLetter } from '../../../../utils';

const styles = require('../request-details.module.css');

interface TenantRequestSummaryProps {
    request: Requests.Types.Request;
}

export const TenantRequestSummary: React.FC<TenantRequestSummaryProps> = ({ request }) => {
    const dispatch = useDispatch();

    const reopenRequest = (): void => {
        RequestsAPI.reopenRequest(request.id)
            .then(() => {
                dispatch({
                    type: Requests.Actions.UPDATE_STATUS,
                    payload: {
                        id: request.id,
                        status: RequestStatus.Open,
                    },
                } as Requests.ActionTypes);
            })
            .catch(() => {});
    };

    return (
        <>
            {request.status === RequestStatus.Closed && (
                <Button callback={reopenRequest} text="Reopen Request" fullWidth withMarginBottom />
            )}
            <div className={styles.TextRow}>
                <p>Category:</p>
                <p>{request.category.name}</p>
            </div>
            {request && request.subcategory && (
                <div className={styles.TextRow}>
                    <p>Subcategory:</p>
                    <p>{request.subcategory.name}</p>
                </div>
            )}
            <div className={styles.TextRow}>
                <p>Priority:</p>
                <p>{capitalizeFirstLetter(request.priority)}</p>
            </div>
            <div className={styles.TextRow}>
                <p>Status:</p>
                <p>{capitalizeFirstLetter(request.status)}</p>
            </div>
        </>
    );
};

