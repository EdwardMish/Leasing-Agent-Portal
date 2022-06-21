import * as React from 'react';
import { useDispatch } from 'react-redux';

import Compliance, { ComplianceType } from '../../../../API/Compliance';
import { globalMessageActionCreators } from '../../../../State';
import { verifyFileUpload } from '../../../../utils';

import { Upload, Close } from '../../../../Icons';

import { Button } from '../../../../Shared/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import UploadFiles from '../../../../Shared/UploadFiles';

import styles = require('../occupant-details.module.css');

interface Properties {
    complianceType: ComplianceType | undefined;
    occupantId: number;
    closeCallback: () => void;
    refreshCallback: () => void;
}

export default ({
    complianceType,
    occupantId,
    closeCallback,
    refreshCallback,
}: Properties): React.ReactElement => {
    const dispatch = useDispatch();

    const [attachments, setAttachments] = React.useState<File[]>([]);
    const [attachmentWarnings, setAttachmentWarnings] = React.useState<string[]>([]);
    const [pending, setPending] = React.useState<boolean>(false);

    const handleFiles = (files: File[]) => {
        setAttachmentWarnings([]);

        const { files: verifiedFiles, warnings } = verifyFileUpload([
            ...attachments,
            ...files,
        ]);

        setAttachments(verifiedFiles);

        if (Object.keys(warnings).length) {
            setAttachmentWarnings(Object.values(warnings));
        }
    };

    const handleFileRemoval = (file: File) => {
        const fileIndex: number = attachments.findIndex(
            (a: File) => (a.name === file.name && a.lastModified === file.lastModified),
        );

        if (fileIndex > -1) {
            setAttachments([
                ...attachments.slice(0, fileIndex),
                ...attachments.slice(fileIndex + 1),
            ]);
        }
    };

    const uploadFiles = () => {
        if (complianceType) {
            if (pending) return;

            setPending(true);

            Compliance.uploadDocument(occupantId, complianceType, attachments)
                .then(() => {
                    dispatch(globalMessageActionCreators.addSuccessMessage('Documents uploaded successfully.'));

                    setPending(false);
                    refreshCallback();
                    closeCallback();
                })
                .catch(() => {
                    setPending(false);

                    dispatch(globalMessageActionCreators.addErrorMessage('We were not able to upload your documents.'));
                });
        }
    };

    return (
        <>
            <FlexWrapper align="start" justify="between" column>
                <FlexWrapper align="start" justify="between" style={{ width: '100%' }}>
                    <FlexWrapper align="center" justify="center">
                        <UploadFiles addFilesCallback={handleFiles}>
                            <div className={styles.AddAttachment}>
                                <Upload />
                                <p>Upload</p>
                            </div>
                        </UploadFiles>
                    </FlexWrapper>
                    <div className={styles.CurrentFiles}>
                        {
                            attachments.length && attachments.length > 0
                                ? (
                                    <>
                                        <p style={{ margin: '0 0 0.75rem' }}><b>Files ready for upload:</b></p>
                                        {
                                            attachments.map((file: File) => (
                                                <div
                                                    className={styles.CurrentFileRow}
                                                    key={`attachment-${file.name}-${file.lastModified}`}
                                                >
                                                    <p>{file.name}</p>
                                                    <div
                                                        className={styles.CurrentFileRowIcon}
                                                        onClick={() => handleFileRemoval(file)}
                                                        onKeyUp={(event) => {
                                                            if (event.keyCode === 13 || event.keyCode === 32) {
                                                                handleFileRemoval(file);
                                                            }
                                                        }}
                                                        role="button"
                                                        tabIndex={0}
                                                    >
                                                        <Close aspect="1rem" />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                )
                                : <div className={styles.CurrentFileRow}><p><b>No Files Added</b></p></div>
                        }
                    </div>
                </FlexWrapper>
                {!!attachmentWarnings.length && attachmentWarnings.map((warning: string) => (
                    <div className={styles.AttachmentWarning} key={`attachment-warning-${warning}`}>
                        <p>{warning}</p>
                    </div>
                ))}
                <Button
                    text="Confirm Upload"
                    callback={uploadFiles}
                    disable={pending || attachments.length < 1}
                    fullWidth
                    withMarginTop
                />
            </FlexWrapper>
        </>
    );
};
