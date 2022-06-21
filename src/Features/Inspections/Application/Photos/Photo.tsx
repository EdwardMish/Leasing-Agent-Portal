import * as React from 'react';
import PhotoLoader from '../../../../Shared/Inspections/DetailRows/PhotoLoader';

import { Photo } from '../../../../State/Inspections/Types/Photo';

interface Properties {
    inspectionId: string | number;
    photo: Photo;
    full?: boolean;
    style?: React.CSSProperties;
}

const Photo: React.FC<Properties> = ({
    inspectionId,
    photo,
    full = false,
    style = {
        width: '7rem',
        height: '3.93rem',
    },
}): React.ReactElement => {
    const { id, imageId, file } = photo;

    const objectUrl: string | undefined = file ? URL.createObjectURL(file) : undefined;

    React.useEffect(() => {
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, []);

    return (
        <PhotoLoader
            photoUrl={
                objectUrl
                    ? objectUrl
                    : `${API_ROOT}/inspections/${inspectionId}/items/${id}/images/${imageId}/${
                        full ? 'full' : 'thumbnail'
                      }`
            }
            previewUrl={
                objectUrl
                    ? objectUrl
                    : `${API_ROOT}/inspections/${inspectionId}/items/${id}/images/${imageId}/${
                        full ? 'full' : 'thumbnail'
                      }`
            }
            style={{
                ...style,
                position: 'relative',
                objectFit: 'cover',
                objectPosition: '50% 50%',
            }}
        />
    );
};

export default Photo;
