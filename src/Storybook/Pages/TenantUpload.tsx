import * as React from 'react';

import { TwoColumnFormRow } from '../../Shared/Forms';
import { Upload, Close } from '../../Icons';
import UploadFiles from '../../Shared/UploadFiles';

import AttachmentStyles from '../../Features/Requests/Create/create-request-form.module.css';

interface UploadComponentProps {
    document: string;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ document }) => {
    const attachments = [];
    const handleFiles = () => console.log('Hi');
    return (
        <div>
            <TwoColumnFormRow>
                <div className={AttachmentStyles.Attachments}>
                    <div className={AttachmentStyles.AttachmentsColumn}>
                        <div className={AttachmentStyles.AddAttachmentsInput}>
                            <UploadFiles addFilesCallback={handleFiles}>
                                <div className={AttachmentStyles.AddAttachment}>
                                    <Upload />
                                    <p>Select {document}</p>
                                </div>
                            </UploadFiles>
                        </div>
                        <div className={AttachmentStyles.CurrentFiles}>
                            <p className={AttachmentStyles.MockLabel}>Attachments</p>
                            {!!attachments.length ? (
                                attachments.map((file: File) => (
                                    <div
                                        className={AttachmentStyles.CurrentFileRow}
                                        key={`attachment-${file.name}-${file.lastModified}`}
                                    >
                                        <p>{file.name}</p>
                                        <div
                                            className={AttachmentStyles.CurrentFileRowIcon}
                                            // onClick={() => handleFileRemoval(file)}
                                        >
                                            <Close aspect="1rem" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={AttachmentStyles.CurrentFileRow}>
                                    <p>No attachments</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </TwoColumnFormRow>
        </div>
    );
};

export default UploadComponent;
