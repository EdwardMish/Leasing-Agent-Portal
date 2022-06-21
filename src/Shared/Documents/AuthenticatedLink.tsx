import * as React from 'react';
import AttachmentsAPI from 'API/Attachments';
import { SpinningLoader } from 'Icons/Animated';
import { CheckMark } from 'Icons';
import { FlexWrapper } from 'Shared/FlexWrapper';

interface Properties {
    url: string;
    filename: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export enum DownloadStatus {
    pending,
    downloading,
    downloaded,
}

export const AuthenticatedLink = ({ url, filename, style = {}, children = null }: Properties): React.ReactElement => {
    const link: React.RefObject<HTMLAnchorElement> = React.createRef<HTMLAnchorElement>();
    const [downloadStatus, setDownloadStatus] = React.useState(DownloadStatus.pending);

    React.useLayoutEffect(() => {
        async function getFile() {
            if (downloadStatus === DownloadStatus.downloading && link.current) {
                const blob = await AttachmentsAPI.getAttachment(url);

                const href = await URL.createObjectURL(blob);

                link.current.download = filename;
                link.current.href = href;

                link.current.click();
                setDownloadStatus(DownloadStatus.downloaded);
            }
        }
        getFile();
    }, [downloadStatus]);

    const handleAction = async () => {
        if (link && link.current) {
            if (link.current.href) return;

            setDownloadStatus(DownloadStatus.downloading);
        }
    };

    return (
        <FlexWrapper justify="start" align="start" style={{ gap: '0.5rem' }}>
            {downloadStatus === DownloadStatus.downloading && <SpinningLoader aspect="1rem" />}
            {downloadStatus === DownloadStatus.downloaded && <CheckMark aspect="1rem" />}
            <a role="button" ref={link} onClick={handleAction} style={style} rel="noreferrer">
                {children}
            </a>
        </FlexWrapper>
    );
};

