import { Form, Formik } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ChevronLeft, IconColors } from '../../../../Icons';

import { selectors } from '../../../../State/Inspections/App';
import { Photo } from '../../../../State/Inspections/Types/Photo';

import { Button } from '../../../../Shared/Button';
import ConfirmationModal from 'Shared/ConfirmationModal/ConfirmationModal';
import { TextArea } from '../../../../Shared/Forms';
import { IconWithText, NoContent } from '../../../../Shared/PageElements';

import NavBar from '../NavBar';
import RequiresFollowUp from '../RequiresFollowUp';
import CategoryWithSaveRow from '../CategoryWithSaveRow';

import PhotoComponent from './Photo';

const spacerStyle: React.CSSProperties = { margin: '1rem 0' };

interface Properties {
    handleEdit: (inspectionId: number, photo: Photo) => void;
    handleDelete: (inspectionId: number, photo: Photo) => void;
}

const PhotoEdit = ({ handleDelete, handleEdit }: Properties): React.ReactElement => {
    const history = useHistory();

    const { photoId: photoIdParam } = useParams<{ photoId: string }>();
    const photoId = parseInt(photoIdParam, 10);

    const inspectionId: number = useSelector(selectors.activeInspectionId);
    const photo: Photo | null = useSelector(selectors.photo(photoId));

    const [confirmationModal, toggleConfirmationModal] = React.useState<boolean>(false);

    const routeBack = () => {
        history.goBack();
    };

    const showConfirm = () => {
        toggleConfirmationModal(true);
    };

    const hideConfirm = () => {
        toggleConfirmationModal(false);
    };

    const editPhoto = (values) => {
        handleEdit(inspectionId, values);
    };

    return (
        <>
            <div style={spacerStyle}>
                <div onClick={routeBack}>
                    <IconWithText Icon={ChevronLeft} iconOnLeft text="Back" />
                </div>
            </div>
            {photo ? (
                <>
                    <PhotoComponent inspectionId={inspectionId} photo={photo} full={true} style={{ width: '100%', height: 'auto' }} />
                    <Formik
                        initialValues={{
                            id: photo?.id,
                            note: photo?.note || '',
                            categoryId: photo?.categoryId || 1,
                            followUp: photo?.followUp || false,
                        }}
                        onSubmit={editPhoto}
                    >
                        {({ dirty, isSubmitting }) => (
                            <Form>
                                <div style={spacerStyle}>
                                    <TextArea
                                        label="Note Entry"
                                        id="note"
                                        name="note"
                                        hideLabel
                                        placeholder="Enter Note..."
                                        required
                                    />
                                </div>
                                <div style={spacerStyle}>
                                    <RequiresFollowUp name="followUp" />
                                </div>
                                <div style={spacerStyle}>
                                    <CategoryWithSaveRow disable={!dirty || isSubmitting} />
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <Button text="Cancel" callback={routeBack} fullWidth inverse withMarginTop />
                    <Button
                        text="Delete"
                        callback={showConfirm}
                        fullWidth
                        withMarginTop
                        style={{
                            backgroundColor: IconColors.WarningRed,
                            borderColor: IconColors.WarningRed,
                        }}
                    />
                    <NavBar />
                    {confirmationModal && (
                        <ConfirmationModal
                            header="Confirm Delete"
                            onCancel={hideConfirm}
                            onConfirm={() => handleDelete(inspectionId, photo)}
                        >
                            <p>Deleting this photo will remove it from the inspection.</p>
                        </ConfirmationModal>
                    )}
                </>
            ) : (
                <NoContent message="No Photo Loaded" />
            )}
        </>
    );
};

export default PhotoEdit;
