import * as React from 'react';
import { useSelector } from 'react-redux';

import { Photo } from '../../../../State/Inspections/Types/Photo';

import { selectors } from '../../../../State/Inspections/App';

import { FlexWrapper } from '../../../../Shared/FlexWrapper';

import PendingPhotoComponent from './PendingPhoto';

const PendingPhotoList = (): React.ReactElement => {

    const pendingPhotos: Photo[] = useSelector(selectors.pendingPhotos);

    return (
        <>
            {
                !!pendingPhotos && pendingPhotos.length > 0 &&
                <FlexWrapper align='start' justify='start' wrap>
                    {
                        pendingPhotos.map((photo) =>
                            <PendingPhotoComponent
                                key={`pending-photo-upload-${photo.id}`}
                                photo={photo}
                            />)
                    }
                </FlexWrapper>
            }
        </>
    )
}

export default PendingPhotoList;
