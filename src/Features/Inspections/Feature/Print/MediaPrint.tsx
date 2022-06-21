import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Photo } from '../../../../State/Inspections/Types/Photo';

import { selectors } from '../../../../State/Inspections/Feature';

import styles from './print.module.css';

import PhotoLoader from '../../../../Shared/Inspections/PrintRows/PhotoLoader';

const groupPhotos = (arr: Photo[], chunkSize: number, maxLength: number): Photo[][] => {
    return Array.from({ length: maxLength }, () => arr.splice(0, chunkSize));
};

const MediaPrint = ({ isImageLoaded }) => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const photos: Photo[] = useSelector(selectors.photos(inspectionId));
    const [loads, setLoads] = React.useState<number>(photos.length | 0);

    const createPhotoUrl = (itemId, imageId) =>
        `${API_ROOT}/inspections/${inspectionId}/items/${itemId}/images/${imageId}/full`;

    const updateLoadStatus = (status) => {
        !status && setLoads((loads) => loads - 1);
    };

    React.useEffect(() => {
        isImageLoaded(loads === 0);
    }, [loads]);

    return (
        <div className={`${styles.pageBreak} ${styles.SectionWrapper}`}>
            <h2 className={styles.SectionTitle}>Media</h2>
            {photos.length == 0 ? (
                <div className={`${styles.DetailDateWrapper} ${styles.NoDetail}`}>
                    <h4>No Media</h4>
                </div>
            ) : (
                <div className={styles.Center}>
                    <div className={styles.MediaWrap}>
                        {groupPhotos(photos, 6, Math.ceil(photos.length / 6)).map((pics) => (
                            <div className={styles.pageBreak} key={`group-${pics[0].imageId}`}>
                                {pics.map((pic) => (
                                    <div key={pic.imageId} className={styles.ImageSquare}>
                                        <PhotoLoader
                                            className={styles.ImageFullSize}
                                            photoUrl={createPhotoUrl(pic.id, pic.imageId)}
                                            loadStatus={updateLoadStatus}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaPrint;
