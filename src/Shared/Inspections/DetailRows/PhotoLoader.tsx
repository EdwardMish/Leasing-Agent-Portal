import * as React from 'react';

import AttachmentsAPI from '../../../API/Attachments';

import PhotoPreview from './PhotoPreview';

interface Properties {
    photoUrl: string;
    previewUrl?: string;
    style: React.CSSProperties;
}

function PhotoLoader({ photoUrl, previewUrl, style }: Properties): React.ReactElement {
    const imageRef = React.createRef<HTMLImageElement>();

    const [showModal, setShowModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        let href: string | null = null;

        if (imageRef.current && !imageRef.current.src) {
            AttachmentsAPI.getAttachment(photoUrl).then((blob: Blob) => {
                href = URL.createObjectURL(blob);

                if (imageRef.current) {
                    imageRef.current.src = href;
                }
            });
        }
        return () => {
            if (href) {
                URL.revokeObjectURL(href);
            }
        };
    }, [photoUrl, imageRef]);

    return (
        <>
            <img ref={imageRef} style={style} onClick={() => setShowModal(true)} />
            {previewUrl && showModal && <PhotoPreview previewUrl={previewUrl} handleClose={() => setShowModal(false)} />}
        </>
    );
}

export default PhotoLoader;
