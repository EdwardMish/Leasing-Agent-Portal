import { RequestsAPI, RequestsTypes } from 'API/Requests';
import { format } from 'date-fns';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../../Shared/Button';
import { EditorContentDisplay } from '../../../../../Shared/Content';
import { DocumentList } from '../../../../../Shared/Documents';
import { LoadingContent, SecondaryTitle } from '../../../../../Shared/PageElements';
import { TabStates } from '../../../../../Shared/TabStates';
import { Requests } from '../../../../../State';
import { RequestStatus } from '../../../../../Types';
import { capitalizeFirstLetter, Mappers } from '../../../../../utils';
import CreatedByUser from '../../CreatedByUser';
import { Notes } from '../../Notes';
import { RequestHistory } from '../../RequestHistory';

const requestDetailsStyles = require('../../request-details.module.css');

interface ClosedRequestAdminViewProps {
    request: Requests.Types.Request;
}

export const ClosedRequestAdminView: React.FC<ClosedRequestAdminViewProps> = ({ request }) => {
    const dispatch = useDispatch();

    const [requestAttachments, setAttachments] = React.useState<RequestsTypes.AttachmentResponse[]>([]);
    const [requestAttachmentsLoaded, setAttachmentsLoaded] = React.useState<boolean>(false);
    const [tabViewState, setTabViewState] = React.useState<number>(0);

    React.useEffect(() => {
        RequestsAPI.getAttachments(request.id)
            .then((attachments) => {
                setAttachments(attachments);
                setAttachmentsLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

    const handleTabStates = (value: number) => {
        setTabViewState(value);
    };

    const tabs = [
        { name: 'Updates', callBack: handleTabStates },
        { name: 'History', callBack: handleTabStates },
    ];

    return (
        <>
            <div className={requestDetailsStyles.RequestSummary}>
                <div className={requestDetailsStyles.RequestSummaryLeftPanel}>
                    <div className={requestDetailsStyles.TextRow}>
                        <p>Created Date:</p>
                        <p>{format(new Date(request.createdDate), 'LL/dd/yy p')}</p>
                    </div>
                    <CreatedByUser name={request.createdBy.name} email={request.createdBy.email} />
                </div>
                <div className={requestDetailsStyles.RequestSummaryRightPanel} style={{ width: '17rem' }}>
                    <Button callback={reopenRequest} text="Reopen Request" fullWidth withMarginBottom />
                    <div className={requestDetailsStyles.TextRow}>
                        <p>Priority:</p>
                        <p>{capitalizeFirstLetter(request.priority)}</p>
                    </div>
                    <div className={requestDetailsStyles.TextRow}>
                        <p>Status:</p>
                        <p>{capitalizeFirstLetter(request.status)}</p>
                    </div>
                    <div className={requestDetailsStyles.TextRow}>
                        <p>Category:</p>
                        <p>{request.category.name}</p>
                    </div>
                    {!!request.subcategory && (
                        <div className={requestDetailsStyles.TextRow}>
                            <p>Subcategory:</p>
                            <p>{request.subcategory.name}</p>
                        </div>
                    )}
                </div>
            </div>
            <SecondaryTitle title="Description" />
            <div className={requestDetailsStyles.RequestDescription}>
                <EditorContentDisplay content={request.description} />
            </div>
            <SecondaryTitle title="Attachments" withMargin={false} />
            {requestAttachmentsLoaded ? (
                <div>
                    <DocumentList
                        documents={requestAttachments.map((attachment: RequestsTypes.AttachmentResponse) =>
                            Mappers.mapAttachmentToDocumentLink(request.id, attachment),
                        )}
                        noContentMessage={`There are no attachments for Request #${request.id}`}
                    />
                </div>
            ) : (
                <LoadingContent />
            )}
            <TabStates tabs={tabs} />
            {tabViewState === 0 ? <Notes requestId={request.id} readOnly /> : <RequestHistory requestId={request.id} />}
        </>
    );
};

