import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Photo } from '../../../../State/Inspections/Types/Photo';

import { selectors } from '../../../../State/Locations';

import PhotoRow from '../../../../Shared/Inspections/DetailRows/PhotoRow';

const InspectionPhotos = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const photos: Photo[] = useSelector(selectors.photos(inspectionId))

    return (
        <div>
            {
                photos.map((photo: Photo) => (
                    <React.Fragment key={`photo-list-${photo.id}`}>
                        <PhotoRow photo={photo} inspectionId={inspectionId} />
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default InspectionPhotos;