import { RequestsAPI } from 'API/Requests';
import { format } from 'date-fns';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingContent } from '../../../../Shared/PageElements';
import { Requests } from '../../../../State';
import { mapRequestHistoryResponseToHistory } from '../../../../utils/Mappers/mapRequestHistoryResponseToHistory';

const styles = require('./request-history.module.css');

interface RequestHistoryProps {
    requestId: number;
}

export const RequestHistory: React.FC<RequestHistoryProps> = ({ requestId }) => {
    const dispatch = useDispatch();

    const { selectors } = Requests;

    const history: Requests.Types.RequestHistory[] = useSelector(selectors.history(requestId));
    const historyLoadedForRequest: boolean = useSelector(selectors.historyLoadedForRequest(requestId));

    React.useEffect(() => {
        if (!historyLoadedForRequest) {
            RequestsAPI.getHistory(requestId).then((historyResponse) => {
                dispatch({
                    type: Requests.Actions.SET_HISTORY,
                    payload: {
                        id: requestId,
                        history: mapRequestHistoryResponseToHistory(historyResponse),
                    },
                } as Requests.ActionTypes);
            });
        }
    }, [historyLoadedForRequest]);

    return (
        <>
            {!!history && !!history.length ? (
                <ul className={styles.RequestHistory}>
                    {history.map(({ createdBy, createdDate, description }: Requests.Types.RequestHistory) => (
                        <li key={`history-detail-${createdDate}`}>
                            <div className={styles.RequestHistoryHeader}>
                                <p>{createdBy}</p>
                                <p>{format(new Date(createdDate), 'LL/dd/yy p')}</p>
                            </div>
                            <p className={styles.RequestHistoryContent}>{description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <LoadingContent message={`No history for Request #${requestId}`} />
            )}
        </>
    );
};

