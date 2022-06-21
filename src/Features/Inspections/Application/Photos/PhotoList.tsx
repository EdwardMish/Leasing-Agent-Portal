import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Photo } from '../../../../State/Inspections/Types/Photo';

import { selectors } from '../../../../State/Inspections/App';
import useActiveInspectionFromState from '../../../../State/Inspections/App/Hooks/useActiveInspectionFromState';

import { Add } from '../../../../Icons';

import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { IconWithText } from '../../../../Shared/PageElements';
import UploadFiles from '../../../../Shared/UploadFiles';

import ApplicationPageWrapper from '../Pages/PageWrapper';

import AddPhotoFullButton from './AddPhotoFullButton';
import PendingPhotoList from './PendingPhotoList';
import PhotoComponent from './Photo';

const PhotoList = (): React.ReactElement => {
    let { propertyId } = useParams<{ propertyId: string }>();

    const { activeInspection, addPhotos } = useActiveInspectionFromState(propertyId);

    const photos: Photo[] = useSelector(selectors.sortedPhotoList);
    const pendingPhotos: Photo[] = useSelector(selectors.pendingPhotos);

    return (
        <ApplicationPageWrapper
            headerAction={
                <UploadFiles addFilesCallback={addPhotos} accept=".gif,.jpg,.jpeg,.png,.bmp">
                    <IconWithText Icon={Add} text="Add Photos" />
                </UploadFiles>
            }
        >
            {!!pendingPhotos && pendingPhotos.length > 0 && (
                <>
                    <h2>Pending Uploads</h2>
                    <PendingPhotoList />
                </>
            )}
            {photos.length ? (
                <>
                    <h2>Photos</h2>
                    <FlexWrapper align="start" justify="start" wrap>
                        {photos.map((photo) => (
                            <Link
                                key={`photo-upload-${photo.id}`}
                                to={`/app/inspections/${propertyId}/photos/${photo.id}`}
                                style={{
                                    width: 'calc(25% - 0.35rem)',
                                    margin: '0 0.35rem 0.35rem 0',
                                }}
                            >
                                <PhotoComponent
                                    inspectionId={activeInspection.id}
                                    photo={photo}
                                    style={{ width: '100%', height: '4.75rem' }}
                                />
                            </Link>
                        ))}
                    </FlexWrapper>
                </>
            ) : (
                <AddPhotoFullButton addFiles={addPhotos} />
            )}
        </ApplicationPageWrapper>
    );
};

export default PhotoList;
