import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Compliance, { ComplianceStatus, ComplianceType } from '../../../../API/Compliance';
import { globalMessageActionCreators, Welcome } from '../../../../State';
import { verifyFileUpload } from '../../../../utils';

import { Close, Upload } from '../../../../Icons';

import { Button } from '../../../../Shared/Button';
import { StatusBar } from '../../../../Shared/Compliance';
import UploadFiles from '../../../../Shared/UploadFiles';

import UploadedDocumentList from '../UploadedDocumentList';
import WelcomeButtonLink from '../WelcomeButtonLink';

import { NotRequiredPopup } from '../../../../Shared/Compliance/Notes';

import styles = require('../welcome.module.css');

export interface ManageComplianceProperties {
    occupantId: number;
    complianceType: ComplianceType;
    title: string;
    nextRoute: string;
    Snippet: React.ReactElement;
}

export const ManageCompliance: React.FC<ManageComplianceProperties> = ({
    occupantId,
    complianceType,
    title,
    nextRoute,
    children,
    Snippet,
}) => {
    const location = useLocation();

    const dispatch = useDispatch();
    const history = useHistory();

    const { compliance, complianceByType } = Welcome.Hooks.useComplianceFromWelcomeState(occupantId);

    const [attachments, setAttachments] = React.useState<File[]>([]);
    const [attachmentWarnings, setAttachmentWarnings] = React.useState<string[]>([]);
    const [showNotRquiredModal, toggleNotRequiredModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        setAttachments([]);
    }, [location]);

    const handleFiles = (files: File[]) => {
        setAttachmentWarnings([]);

        const { files: verifiedFiles, warnings } = verifyFileUpload([...attachments, ...files]);

        setAttachments(verifiedFiles);

        if (Object.keys(warnings).length) {
            setAttachmentWarnings(Object.values(warnings));
        }
    };

    const handleFileRemoval = (file: File) => {
        const fileIndex: number = attachments.findIndex(
            (a: File) => a.name === file.name && a.lastModified === file.lastModified
        );

        if (fileIndex > -1) {
            setAttachments([...attachments.slice(0, fileIndex), ...attachments.slice(fileIndex + 1)]);
        }
    };

    const uploadFiles = () => {
        Compliance.uploadDocument(occupantId, complianceType, attachments)
            .then(() => {
                setAttachments([]);
                history.push(nextRoute);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('We were not able to upload your documents.'));
            });
    };

    const renderStatus = () => {
        if (compliance) {
            const status = complianceByType(complianceType)?.complianceStatus;

            return (
                <div style={{ margin: '1.5rem 0' }}>
                    <StatusBar status={status || ComplianceStatus.NotSubmitted} type={complianceType} showChildren={[]} />
                </div>
            );
        }

        return null;
    };

    const addNote = (note: string) => {
        Compliance.addNote(occupantId, complianceType, note)
            .then(() => {
                history.push(nextRoute);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to add note, please try again.'));
            });
    };

    const requestNotRequired = (note: string) => {
        Compliance.skipCompliance(occupantId, complianceType)
            .then(() => {
                addNote(note);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('An error occured marking step as not required.'));
            });
    };

    return (
        <>
            <h1>{title}</h1>
            <p className={styles.WelcomeParagraphBlock}>{Snippet}</p>
            {children}
            {renderStatus()}
            <UploadedDocumentList complianceType={complianceType} occupantId={occupantId} />
            <div className={styles.Attachments}>
                <div className={styles.AttachmentsColumn}>
                    <div className={styles.AddAttachmentsInput}>
                        <UploadFiles addFilesCallback={handleFiles}>
                            <div className={styles.AddAttachment}>
                                <Upload />
                                <p>Upload Files</p>
                            </div>
                        </UploadFiles>
                    </div>
                    <div className={styles.CurrentFiles}>
                        <p className={styles.MockLabel}>Files ready for upload</p>
                        {attachments.length ? (
                            attachments.map((file: File) => (
                                <div className={styles.CurrentFileRow} key={`attachment-${file.name}-${file.lastModified}`}>
                                    <p>{file.name}</p>
                                    <div className={styles.CurrentFileRowIcon} onClick={() => handleFileRemoval(file)}>
                                        <Close aspect="1rem" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.CurrentFileRow}>
                                <p style={{ margin: '0.75rem 0 0' }}>No attachments</p>
                            </div>
                        )}
                    </div>
                </div>
                {!!attachmentWarnings.length &&
                    attachmentWarnings.map((warning: string) => (
                        <div className={styles.AttachmentWarning} key={`attachment-warning-${warning}`}>
                            <p>{warning}</p>
                        </div>
                    ))}
                <Button text="Upload and Continue" callback={uploadFiles} disable={attachments.length < 1} />
                {complianceType !== ComplianceType.CertificateOfInsurance &&
                (complianceByType(complianceType)?.complianceStatus ?? ComplianceStatus.NotSubmitted) ===
                    ComplianceStatus.NotSubmitted ? (
                    <Button withMarginTop text="Not Required" callback={() => toggleNotRequiredModal(true)} />
                ) : null}
                {showNotRquiredModal && (
                    <NotRequiredPopup
                        handleClose={() => toggleNotRequiredModal(false)}
                        requestNotRequired={(note) => requestNotRequired(note)}
                    />
                )}
            </div>
            <WelcomeButtonLink link={nextRoute} display="Upload Later" inverse />
        </>
    );
};
