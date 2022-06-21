import { Form, Formik } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { selectors } from '../../../../State/Inspections/App';
import useActiveInspectionFromState from '../../../../State/Inspections/App/Hooks/useActiveInspectionFromState';

import {
    InspectionCategories,
    InspectionCategoriesDisplayName
} from '../../../../State/Inspections/Types/InspectionCategories';
import { InspectionItem } from '../../../../State/Inspections/Types/InspectionItem';

import isNote from '../../../../State/Inspections/Types/TypeGuards/isNote';
import isPhoto from '../../../../State/Inspections/Types/TypeGuards/isPhoto';

import { Button } from '../../../../Shared/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { FormButtons, TextArea } from '../../../../Shared/Forms';
import UploadFiles from '../../../../Shared/UploadFiles';

import NoteDisplay from '../Notes/NoteDisplay';
import PhotoDisplay from '../Photos/PhotoDisplay';
import RequiresFollowUp from '../RequiresFollowUp';

import styles = require('./categories.module.css');

interface CategoryBlockProps {
    categoryId: InspectionCategories;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ categoryId }): React.ReactElement => {
    const history = useHistory();

    const activeInspectionId: number = useSelector(selectors.activeInspectionId);
    const listItems: InspectionItem[] = useSelector(selectors.itemsByCategory(categoryId));

    const { propertyId: propertyIdParam } = useParams<{ propertyId: string }>();
    const propertyId = parseInt(propertyIdParam, 10);

    const { addNote, addPhotos } = useActiveInspectionFromState(propertyId);

    const [noteEntry, toggleNoteEntry] = React.useState<boolean>(false);

    const createNote = ({
        note,
        requiresFollowUp,
    }, {
        resetForm,
        setSubmitting,
    }) => {
        addNote({
            note,
            followUp: requiresFollowUp,
            categoryId,
            id: Date.now(),
        })
            .then(() => {
                resetForm({
                    note: '',
                    categoryId,
                    requiresFollowUp: false,
                });

                setSubmitting(false);
                toggleNoteEntry(false);
            })
            .catch(() => {
                setSubmitting(false);
            });
    };

    const handlePhotos = (files: File[]) => {
        addPhotos(files, { categoryId });
    };

    const renderItem = (item: InspectionItem) => {
        if (isNote(item)) {
            return (
                <NoteDisplay
                    display={item.note || ''}
                    id={item.id}
                    categoryId={categoryId}
                    followUp={item.followUp}
                    editable
                    onEdit={(id) => history.push(`/app/inspections/${propertyId}/notes/${id}`)}
                />
            );
        }

        if (isPhoto(item)) {
            return (
                <PhotoDisplay
                    inspectionId={activeInspectionId}
                    photo={item}
                    propertyId={propertyId}
                />
            );
        }

        return null;
    };

    return (
        <div className={styles.CategoryBlock}>
            <h2>{InspectionCategoriesDisplayName[categoryId]}</h2>
            {
                noteEntry
                    ? (
                        <div style={{ padding: '1rem' }}>
                            <Formik
                                initialValues={{
                                    note: '',
                                    requiresFollowUp: false,
                                }}
                                onSubmit={createNote}
                                validationSchema={
                                    Yup.object({
                                        note: Yup.string().required('Enter a note.'),
                                    })
                                }
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div style={{ margin: '0 0 1rem' }}>
                                            <TextArea
                                                label="Note Entry"
                                                id="note"
                                                name="note"
                                                hideLabel
                                                placeholder="Enter Note..."
                                                required
                                            />
                                        </div>
                                        <div style={{ margin: '0 0 1.25rem' }}>
                                            <RequiresFollowUp name="requiresFollowUp" />
                                        </div>
                                        <FormButtons.Submit
                                            text="Save"
                                            disable={isSubmitting}
                                            style={{ height: '3rem', width: '100%' }}
                                        />
                                        <Button
                                            text="Cancel"
                                            callback={() => { toggleNoteEntry(false); }}
                                            fullWidth
                                            disable={isSubmitting}
                                            inverse
                                            withMarginTop
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )
                    : (
                        <>
                            {
                                listItems.length > 0
                                && (
                                    <div style={{ padding: '0 1rem 1rem' }}>
                                        {
                                            listItems.map((listItem: InspectionItem) => (
                                                <React.Fragment key={`category-list-item-${categoryId}-${listItem.id}`}>
                                                    {renderItem(listItem)}
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </>
                    )
            }
            <FlexWrapper align="center" justify="between" className={styles.InteractiveBlocks}>
                <div
                    onClick={() => {
                        toggleNoteEntry(!noteEntry);
                    }}
                    onKeyUp={(event) => {
                        if (event.keyCode === 13 || event.keyCode === 32) {
                            toggleNoteEntry(!noteEntry);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <p>Add Note</p>
                </div>
                <UploadFiles addFilesCallback={handlePhotos}><p>Add Photo</p></UploadFiles>
            </FlexWrapper>
        </div>
    );
};

export default CategoryBlock;
