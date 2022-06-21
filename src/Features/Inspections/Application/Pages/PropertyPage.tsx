import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import Inspections, { Types } from '../../../../API/Inspections';
import { InspectionItem } from '../../../../API/Inspections/InspectionsTypes';

import { LoadingContent } from '../../../../Shared/PageElements';

import { globalMessageActionCreators, InspectionsApp } from '../../../../State';
import useActiveInspectionFromState from '../../../../State/Inspections/App/Hooks/useActiveInspectionFromState';
import Mappers from '../../../../State/Inspections/App/Mappers';
import { Photo } from '../../../../State/Inspections/Types/Photo';

import CategoryList from '../Categories/CategoryList';
import ItemsDisplay from '../ItemsDisplay';
import CreateNote from '../Notes/CreateNote';
import EditNote from '../Notes/EditNote';
import PhotoEdit from '../Photos/PhotoEdit';
import PhotoList from '../Photos/PhotoList';
import PhotoUploader from '../Photos/PhotoUploader';
import Summary from '../Summary';
import UseOrDeleteDraft from '../UseOrDeleteDraft';
import InteractionsPage from './InteractionsPage';
import ApplicationPageWrapper from './PageWrapper';

export default (): React.ReactElement => {
    const dispatch = useDispatch();

    const { propertyId: propertyIdParam } = useParams<{ propertyId: string }>();
    const propertyId = parseInt(propertyIdParam, 10);

    const [bypassDraft, toggleBypassDraft] = React.useState<boolean>(false);
    const [draft, setDraft] = React.useState<Types.Inspection | null>(null);
    const [loadingDraft, setLoadingDraft] = React.useState<boolean>(false);

    const { addNote, activeInspection } = useActiveInspectionFromState(propertyId);

    React.useEffect(() => {
        if (!activeInspection || activeInspection.propertyId != propertyId) {
            setLoadingDraft(true);
            Inspections.getInspectionDraftForProperty(propertyId).then((result) => {
                if (result) {
                    Inspections.getInspection(result.inspectionDraftId).then((inspection: Types.Inspection) => {
                        setDraft(inspection);
                    });
                }
                setLoadingDraft(false);
            });
        }
    }, [propertyId, activeInspection.propertyId]);

    const handleUseDraft = () => {
        if (draft) {
            dispatch({
                type: InspectionsApp.Actions.SET_ACTIVE_INSPECTION,
                payload: Mappers.mapDraftToActiveInspection(draft),
            });
            setDraft(null);
            toggleBypassDraft(true);
        }
    };

    const handleDeletePhoto = (inspectionId: number, photo: Photo) => {
        if (!photo) return;

        Inspections.deleteItem(inspectionId, photo.id)
            .then(() => {
                dispatch({
                    type: InspectionsApp.Actions.DELETE_PHOTO,
                    payload: photo.id,
                });

                history.back();
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('We were not able to delete your photo at this time.'));
            });
    };

    const handleEditPhoto = async (inspectionId: number, photo: Photo): Promise<void> => {
        await Inspections.updateItem(inspectionId, photo.id, photo.followUp, photo.categoryId, photo.note);

        dispatch({
            type: InspectionsApp.Actions.UPDATE_PHOTO,
            payload: photo,
        });

        history.back();
    };

    const handleCreateNote = async (note: string, categoryId: number, followUp: boolean) => {
        addNote({
            note,
            categoryId,
            followUp,
        } as InspectionItem);
    };

    const clearDraft = () => {
        setDraft(null);
        toggleBypassDraft(true);
    };

    return (
        <>
            {!loadingDraft ? (
                <>
                    {bypassDraft || draft == null ? (
                        <>
                            <PhotoUploader />
                            <Switch>
                                <Route path="/app/inspections/:propertyId/categories">
                                    <ApplicationPageWrapper>
                                        <CategoryList />
                                    </ApplicationPageWrapper>
                                </Route>
                                <Route path="/app/inspections/:propertyId/interactions">
                                    <InteractionsPage />
                                </Route>
                                <Route path="/app/inspections/:propertyId/photos/:photoId">
                                    <ApplicationPageWrapper>
                                        <PhotoEdit handleDelete={handleDeletePhoto} handleEdit={handleEditPhoto} />
                                    </ApplicationPageWrapper>
                                </Route>
                                <Route path="/app/inspections/:propertyId/photos">
                                    <PhotoList />
                                </Route>
                                <Route path="/app/inspections/:propertyId/complete">
                                    <ApplicationPageWrapper>
                                        <Summary />
                                    </ApplicationPageWrapper>
                                </Route>
                                <Route exact path="/app/inspections/:propertyId/notes/:noteId">
                                    <ApplicationPageWrapper>
                                        <EditNote />
                                    </ApplicationPageWrapper>
                                </Route>
                                <Route path="/app/inspections/:propertyId">
                                    <ApplicationPageWrapper>
                                        <ItemsDisplay />
                                        <CreateNote handleNoteCreate={handleCreateNote} />
                                    </ApplicationPageWrapper>
                                </Route>
                            </Switch>
                        </>
                    ) : (
                        <UseOrDeleteDraft
                            draft={draft}
                            propertyId={propertyId}
                            clearDraft={clearDraft}
                            useDraft={handleUseDraft}
                        />
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};
