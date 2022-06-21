import { RequestsAPI } from 'API/Requests';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Requests } from '../../../../State';
import { addErrorMessage, addSuccessMessage } from '../../../../State/GlobalMessages/actionCreators';
import { RequestStatus } from '../../../../Types';

interface StatusProps {
    currentStatus: string;
    errorCallback: (field: string, value: string) => void;
    requestId: number;
}

export const StatusFormHandler: React.FC<StatusProps> = ({ currentStatus, errorCallback, requestId }) => {
    const dispatch = useDispatch();
    const { values } = useFormikContext<{ status: RequestStatus }>();

    const { status } = values;

    React.useEffect(() => {
        if (status !== currentStatus) {
            RequestsAPI.changeStatus(requestId, status)
                .then(() => {
                    dispatch({
                        type: Requests.Actions.UPDATE_STATUS,
                        payload: {
                            id: requestId,
                            status,
                        },
                    } as Requests.ActionTypes);

                    dispatch(addSuccessMessage(`Status updated for Request #${requestId}`));
                })
                .catch(() => {
                    errorCallback('status', currentStatus);

                    dispatch(addErrorMessage(`We could not update the status for Request #${requestId}`));
                });
        }
    }, [status]);

    return null;
};

