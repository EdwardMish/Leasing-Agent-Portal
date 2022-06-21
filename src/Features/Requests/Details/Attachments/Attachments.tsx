import { RequestsAPI, RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import { Add, Upload } from '../../../../Icons';
import { DocumentList } from '../../../../Shared/Documents';
import { LoadingContent, SecondaryTitle, SecondaryTitleWithAction } from '../../../../Shared/PageElements';
import UploadFiles from '../../../../Shared/UploadFiles';
import { CurrentUserState, globalMessageActionCreators, Requests } from '../../../../State';
import { RequestStatus } from '../../../../Types';
import { Mappers, verifyFileUpload } from '../../../../utils';

const styles = require('./attachments.module.css');

interface AttachmentsProps {
    request: Requests.Types.Request;
    requestIsLoaded: boolean;
}

export const Attachments: React.FC<AttachmentsProps> = ({ request, requestIsLoaded }) => {
    const dispatch = useDispatch();

    const { id, status } = request;

    const userIsOO: boolean = useSelector(CurrentUserState.selectors.currentUserIsOwnerOperator);

    const [requestAttachments, setAttachments] = React.useState<RequestsTypes.AttachmentResponse[]>([]);
    const [requestAttachmentsLoaded, setAttachmentsLoaded] = React.useState<boolean>(false);
    const [uploadAttachmentModal, toggleAttachmentModal] = React.useState<boolean>(false);
    const [uploadingAttachments, setUploadingAttachments] = React.useState<boolean>(false);
    const [attachmentsToUpload, setAttachmentsToUpload] = React.useState<File[]>([]);
    const [attachmentWarnings, setAttachmentWarnings] = React.useState<string[]>([]);

    const handleAttachment = (files: File[]) => {
        setAttachmentWarnings([]);

        const { files: verifiedFiles, warnings } = verifyFileUpload(
            [...attachmentsToUpload, ...files],
            requestAttachments.map((attachment) => attachment.name),
        );

        setAttachmentsToUpload(verifiedFiles);

        if (!!Object.keys(warnings).length) {
            setAttachmentWarnings(Object.values(warnings));
        }
    };

    const loadAttachments = () => {
        RequestsAPI.getAttachments(id)
            .then((attachments) => {
                setAttachments(attachments);
                setAttachmentsLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const uploadAttachments = () => {
        setUploadingAttachments(true);

        if (!!!attachmentsToUpload.length) {
            setUploadingAttachments(false);
            return;
        }

        RequestsAPI.addAttachments(id, attachmentsToUpload).then(() => {
            setAttachmentsToUpload([]);
            toggleAttachmentModal(false);

            loadAttachments();
            setUploadingAttachments(false);
        });
    };

    const deleteAttachment = (identifier: string) => {
        RequestsAPI.deleteAttachment(id, identifier)
            .then(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage(`The attachment was deleted`));
                loadAttachments();
            })
            .catch((err) => {
                dispatch(globalMessageActionCreators.addErrorMessage(`The attachment could not be deleted`, err));
            });
    };

    React.useEffect(() => {
        if (requestIsLoaded && !requestAttachmentsLoaded) loadAttachments();
    }, [requestIsLoaded]);

    return (
        <>
            <div>
                {status === RequestStatus.Closed ? (
                    <SecondaryTitle title="Attachments" withMargin={false} />
                ) : (
                    <SecondaryTitleWithAction
                        title="Attachments"
                        action={{
                            actionTitle: 'Upload Attachment',
                            callBack: () => {
                                toggleAttachmentModal(true);
                            },
                        }}
                        ActionIcon={Add}
                        withMargin={false}
                    />
                )}
                <div className={styles.RequestAttachmentsList}>
                    {requestAttachmentsLoaded ? (
                        <DocumentList
                            documents={requestAttachments.map((attachment: RequestsTypes.AttachmentResponse) =>
                                Mappers.mapAttachmentToDocumentLink(id, attachment),
                            )}
                            noContentMessage={`There are no attachments for this request.`}
                            allowRemoval={userIsOO}
                            removeItem={deleteAttachment}
                        />
                    ) : (
                        <LoadingContent />
                    )}
                </div>
            </div>
            {uploadAttachmentModal && (
                <ModalWithAction
                    header="Upload Attachment"
                    actionText="Upload"
                    actionCallback={uploadAttachments}
                    disable={uploadingAttachments || !!attachmentWarnings.length}
                    cancelCallback={() => {
                        setAttachmentsToUpload([]);
                        setAttachmentWarnings([]);
                        toggleAttachmentModal(false);
                    }}
                >
                    <div className={styles.UploadAttachmentModal}>
                        <div className={styles.UploadAttachmentModalDisplay}>
                            <div className={styles.UploadIconWrapper}>
                                <UploadFiles addFilesCallback={handleAttachment}>
                                    <div className={styles.UploadIcon}>
                                        <Upload />
                                        <p>Upload Files</p>
                                    </div>
                                </UploadFiles>
                            </div>
                            <div className={styles.AttachmentList}>
                                {!!attachmentsToUpload.length ? (
                                    attachmentsToUpload.map((file: File) => (
                                        <p
                                            key={`file-to-upload-${file.name}-${file.lastModified}`}
                                            className={styles.FileRow}
                                        >
                                            {file.name}
                                        </p>
                                    ))
                                ) : (
                                    <p className={styles.FileRow}>No attachments</p>
                                )}
                            </div>
                        </div>
                        {!!attachmentWarnings.length &&
                            attachmentWarnings.map((warning: string) => (
                                <div className={styles.AttachmentWarning} key={`attachment-warning-${warning}`}>
                                    <p>{warning}</p>
                                </div>
                            ))}
                    </div>
                </ModalWithAction>
            )}
        </>
    );
};

