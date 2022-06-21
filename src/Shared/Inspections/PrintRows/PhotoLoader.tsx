import * as React from 'react';

import AttachmentsAPI from '../../../API/Attachments';

import { AnimatedIcons } from '../../../Icons';

interface Properties {
    photoUrl: string;
    className: string;
    loadStatus: (status: boolean) => void;
}

function PhotoLoader({ photoUrl, className, loadStatus }: Properties): React.ReactElement {
    const [imageSRC, setImageSRC] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        let href: string | null = null;
        AttachmentsAPI.getAttachment(photoUrl).then((blob: Blob) => {
            href = URL.createObjectURL(blob);
            setImageSRC(href);
            setLoading(false);
            loadStatus(false);
        });
    }, [photoUrl]);

    return loading ? (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    left: 'calc(50% - 0.75rem)',
                    top: 'calc(50% - 0.75rem)',
                    zIndex: 1,
                }}
            >
                <AnimatedIcons.SpinningLoader aspect="1.5rem" />
            </div>

            <div className={className} />
        </div>
    ) : (
        <img src={imageSRC} className={className} />
    );
}

export default PhotoLoader;
