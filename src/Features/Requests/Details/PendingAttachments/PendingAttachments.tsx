import { RequestsAPI } from 'API/Requests';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../Shared/Button';
import { ButtonRow } from '../../../../Shared/ButtonRow';
import { Requests } from '../../../../State';

const styles = require('./pending-attachments.module.css');

interface PendingAttachmentsProps {
    requestId: number;
}

export const PendingAttachments: React.FC<PendingAttachmentsProps> = ({ requestId }) => {
    const dispatch = useDispatch();
    const { selectors } = Requests;

    const hasPendingAttachments: boolean = useSelector(selectors.hasPendingAttachments(requestId));
    const pendingAttachments: File[] = useSelector(selectors.pendingAttachments(requestId));

    const handleUpload = () => {
        RequestsAPI.addAttachments(requestId, pendingAttachments)
            .then(() => {
                dispatch({
                    type: Requests.Actions.CLEAR_PENDING_ATTACHMENTS,
                    payload: requestId,
                } as Requests.ActionTypes);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClear = () => {
        dispatch({
            type: Requests.Actions.CLEAR_PENDING_ATTACHMENTS,
            payload: requestId,
        } as Requests.ActionTypes);
    };

    return (
        <>
            {hasPendingAttachments ? (
                <div className={styles.PendingAttachments}>
                    <div>
                        <h2>Pending Attachments</h2>
                        <p>There are attachments that could not be loaded when this request was created.</p>
                        <p>Would you like to upload them now?</p>
                        <ButtonRow withMarginTop>
                            <Button lowProfile callback={handleClear} text="Cancel" inverse />
                            <Button lowProfile callback={handleUpload} text="Upload" />
                        </ButtonRow>
                    </div>
                    <div>
                        {pendingAttachments.map((file: File) => (
                            <p className={styles.FileRow} key={`pending-file-${file.name}-${file.size}`}>
                                {file.name}
                            </p>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
};

