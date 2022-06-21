import AttachmentsAPI from 'API/Attachments';
import { saveAs } from 'file-saver';
import React from 'react';
import { Button } from 'Shared/Button';
import Modal from 'Shared/Modal/Modal';
import styles from './photopreview.module.css';

interface Properties {
    previewUrl: string;
    handleClose: () => void;
}

function PhotoPreview({ previewUrl, handleClose }: Properties): React.ReactElement {
    const imageRef = React.createRef<HTMLImageElement>();

    React.useEffect(() => {
        AttachmentsAPI.getAttachment(previewUrl).then((blob: Blob) => {
            const href = URL.createObjectURL(blob);

            if (imageRef && imageRef.current) {
                imageRef.current.src = href;
            }

            return () => {
                URL.revokeObjectURL(href);
            };
        });
    }, [previewUrl, imageRef]);

    const downloadImage = () => {
        saveAs(imageRef.current?.src, 'image.jpg');
    };

    return (
        <Modal header="Preview" callBack={handleClose}>
            {imageRef ? (
                <>
                    <img ref={imageRef} className={styles.previewImg} />
                    <div style={{ height: '50px' }}>
                        <Button
                            callback={downloadImage}
                            text="Download"
                            inverse
                            style={{
                                padding: '.25rem 1rem',
                                margin: '1rem',
                                float: 'right',
                            }}
                        />
                    </div>
                </>
            ) : (
                'No Image'
            )}
        </Modal>
    );
}

export default PhotoPreview;

