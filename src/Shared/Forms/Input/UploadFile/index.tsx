/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useField, useFormikContext } from 'formik';
import { Close as CloseIcon, IconColors, Upload as UploadIcon } from 'Icons';
import React from 'react';
import { FlexWrapper } from 'Shared/FlexWrapper';
import UploadFiles from 'Shared/UploadFiles';
import styles from './style.css';
import Thumbnail from './Thumbnail';

interface UploadFilePropsType {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    accept?: string;
    showThumbnail?: boolean;
    multiple?: boolean;
}

const UploadFile = ({
    id,
    name,
    label,
    required,
    accept,
    showThumbnail = true,
    multiple = false,
}: UploadFilePropsType): React.ReactElement => {
    const [field, meta] = useField({ name });
    const formik = useFormikContext();
    const fileList = field?.value;

    const uploadFileHandler = (files) => {
        if (multiple) {
            // multiple files
            const fileValues = files.map((file) => ({ name: encodeURI(file.name), url: window.URL.createObjectURL(file) }));
            const finalFileList = fileList ? [...fileList, ...fileValues] : fileValues;
            formik.setFieldValue(name, finalFileList);
        } // single file
        else {
            const fileValue = { name: encodeURI(files[0]?.name), url: window.URL.createObjectURL(files[0]) };

            formik.setFieldValue(name, fileValue);
        }
    };

    const removeFileHandler = (file) => {
        if (multiple) {
            // multiple files
            const files = field?.value.filter((f) => f.name !== file.name);
            formik.setFieldValue(name, files);
        } else {
            // single file
            formik.setFieldValue(name, null);
        }
    };

    const shortenFileName = (fileName) => (fileName?.length > 15 ? `${fileName.substring(0, 12)}...` : fileName);

    const renderFileName = (file) => (
        <FlexWrapper align="center" justify="between" fullWidth key={file?.name}>
            <p className={styles.CurrentFileName}>{shortenFileName(decodeURI(file?.name))}</p>
            <span className={styles.CurrentFileRowIcon} onClick={() => removeFileHandler(file)}>
                <CloseIcon aspect="1rem" color={IconColors.WarningRed} />
            </span>
        </FlexWrapper>
    );

    return (
        <div id={id} className={styles.Attachments}>
            <div className={styles.AttachmentsColumn}>
                <div className={styles.AddAttachmentsInput}>
                    <UploadFiles addFilesCallback={uploadFileHandler} accept={accept} multiple={multiple}>
                        <div className={styles.AddAttachment}>
                            <UploadIcon />
                            <p>{label}</p>
                            <p>{required ? '(required)' : ''}</p>
                        </div>
                    </UploadFiles>
                </div>
                <div className={styles.CurrentFiles}>
                    <p className={styles.MockLabel}>Attachment:</p>
                    {!!fileList || fileList?.length > 0 ? (
                        <div>
                            <div className={styles.CurrentFileList}>
                                {multiple ? fileList.map((file) => renderFileName(file)) : renderFileName(fileList)}
                            </div>

                            {showThumbnail && !multiple && !!fileList && (
                                <Thumbnail
                                    id={`thumbnail-attachment-${id}-${name}`}
                                    name={decodeURI(fileList?.name)}
                                    src={fileList?.url}
                                    alt={fileList?.name}
                                />
                            )}
                        </div>
                    ) : (
                        <div className={styles.CurrentFileRow}>
                            <p>No attachment</p>
                        </div>
                    )}
                </div>
            </div>

            {meta.touched && meta.error && (
                <div className={styles.Error}>
                    <span>{meta.error}</span>
                </div>
            )}
        </div>
    );
};

export default UploadFile;
