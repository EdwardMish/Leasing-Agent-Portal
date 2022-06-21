import React from 'react';

import { FormInputs, TwoColumnFormRow } from '../../Shared/Forms';
import { Upload, Close } from '../../Icons';
import UploadFiles from '../../Shared/UploadFiles';
import NavigationButtons from '../molecules/NavigationButtons';

import styles from '../Pages/prospective-tenant.module.css';
import AttachmentStyles from '../../Features/Requests/Create/create-request-form.module.css';

const StateIDForm = ({ isSubmitting, handleFiles }) => {
    const attachments = [];
    return (
        <>
            <div className={styles.LeadInput}>
                <FormInputs.Text
                    id="License #"
                    name="License #"
                    label="Identification #"
                    fullWidth
                    // hideLabel
                    required
                    placeholder="Identification #"
                />
            </div>
            <div className={styles.LeadInput}>
                <FormInputs.Text
                    id="State"
                    name="State"
                    label="State Of Issue"
                    fullWidth
                    // hideLabel
                    required
                    placeholder="State"
                />
            </div>
            <div className={styles.LeadInputLast}>
                <FormInputs.Text
                    id="Expiration"
                    name="Expiration"
                    label="Expiration Date"
                    fullWidth
                    // hideLabel
                    required
                    placeholder="Expiration Date"
                />
            </div>

            <TwoColumnFormRow>
                <div className={AttachmentStyles.Attachments}>
                    <div className={AttachmentStyles.AttachmentsColumn}>
                        <div className={AttachmentStyles.AddAttachmentsInput}>
                            <UploadFiles addFilesCallback={handleFiles}>
                                <div className={AttachmentStyles.AddAttachment} style={{ width: '8rem' }}>
                                    <Upload aspect={'1.3rem'} />
                                    <p>Upload ID Front (required)</p>
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
                <div className={AttachmentStyles.Attachments}>
                    <div className={AttachmentStyles.AttachmentsColumn}>
                        <div className={AttachmentStyles.AddAttachmentsInput}>
                            <UploadFiles addFilesCallback={handleFiles}>
                                <div className={AttachmentStyles.AddAttachment} style={{ width: '8rem' }}>
                                    <Upload />
                                    <p>Upload ID Back (required)</p>
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

            <NavigationButtons leftTitle={'back'} rightTitle={'Next'} />
        </>
    );
};

export default StateIDForm;

