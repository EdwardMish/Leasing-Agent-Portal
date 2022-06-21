import { RequestsAPI, RequestsTypes } from 'API/Requests';
import { format } from 'date-fns';
import * as React from 'react';
import { EditorContentDisplay } from '../../../../Shared/Content';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { LoadingContent } from '../../../../Shared/PageElements';
import CreatedByUser from '../../Details/CreatedByUser/CreatedByUser';

import styles = require('./request-summary.module.css');

interface RequestSummaryProps {
    requestId: number;
}

const RequestSummary: React.FC<RequestSummaryProps> = ({ requestId }) => {
    const [requestDetailsLoaded, setRequestDetailsLoaded] = React.useState<boolean>();
    const [request, setRequest] = React.useState<RequestsTypes.RequestResponse>({
        createdBy: {
            name: 'No Name',
            email: 'No Email',
        },
        createdDate: new Date(Date.now()).toDateString(),
        description: 'No Description',
    } as RequestsTypes.RequestResponse);

    React.useEffect(() => {
        RequestsAPI.getDetails(requestId).then((r: RequestsTypes.RequestResponse) => {
            setRequest(r);
            setRequestDetailsLoaded(true);
        });
    }, []);

    return (
        <div className={styles.SummaryWrapper}>
            {requestDetailsLoaded ? (
                <FlexWrapper className={styles.Summary} align="start" justify="between">
                    <div className={styles.SummaryPanel}>
                        <CreatedByUser name={request.createdBy.name} email={request.createdBy.email} />
                        <div style={{ margin: '0.5rem 0 0.75rem', lineHeight: '1.35rem' }}>
                            <p>
                                <b>{request.occupantName}</b>
                            </p>
                            <p>{`@ ${request.propertyName}`}</p>
                        </div>
                        <p>
                            <b>{`Created: ${format(new Date(request.createdDate), 'LL/dd/yy')}`}</b>
                        </p>
                    </div>
                    <div className={styles.Description}>
                        <EditorContentDisplay content={request.description} />
                    </div>
                </FlexWrapper>
            ) : (
                <LoadingContent message="Loading Request Details..." />
            )}
        </div>
    );
};

export default RequestSummary;

