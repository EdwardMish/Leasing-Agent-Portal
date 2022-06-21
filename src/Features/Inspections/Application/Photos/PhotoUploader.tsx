import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InspectionsAPI from '../../../../API/Inspections';

import { InspectionsApp } from '../../../../State';
import { Photo } from '../../../../State/Inspections/Types/Photo';
import { ActiveInspection } from '../../../../State/Inspections/App/Types';

const PhotoUploader = (): null => {
    const dispatch = useDispatch();

    const inspection: ActiveInspection = useSelector(InspectionsApp.selectors.activeInspection);
    const pendingPhotos: Photo[] = useSelector(InspectionsApp.selectors.pendingPhotos);

    React.useEffect(() => {
        if (!!pendingPhotos.length && !inspection.uploading) {
            const toUpload: Photo = pendingPhotos[0];

            dispatch({
                type: InspectionsApp.Actions.UPDATE_UPLOADING_STATUS,
                payload: true,
            } as InspectionsApp.ActionTypes);

            if (toUpload.file) {
                InspectionsAPI.addPhotoAsEmptyItem(inspection.id, toUpload.file, { categoryId: toUpload.categoryId }).then(
                    ({ itemId, imageId }) => {
                        dispatch({
                            type: InspectionsApp.Actions.ADD_PHOTO,
                            payload: {
                                ...toUpload,
                                id: itemId,
                                imageId,
                            },
                        } as InspectionsApp.ActionTypes);

                        dispatch({
                            type: InspectionsApp.Actions.REMOVE_PENDING_PHOTO,
                            payload: toUpload.id,
                        } as InspectionsApp.ActionTypes);

                        dispatch({
                            type: InspectionsApp.Actions.UPDATE_UPLOADING_STATUS,
                            payload: false,
                        } as InspectionsApp.ActionTypes);
                    }
                );
            } else {
                dispatch({
                    type: InspectionsApp.Actions.REMOVE_PENDING_PHOTO,
                    payload: toUpload.id,
                } as InspectionsApp.ActionTypes);
                dispatch({
                    type: InspectionsApp.Actions.UPDATE_UPLOADING_STATUS,
                    payload: false,
                } as InspectionsApp.ActionTypes);
            }
        }
    }, [inspection.uploading, pendingPhotos]);

    return null;
};

export default PhotoUploader;
