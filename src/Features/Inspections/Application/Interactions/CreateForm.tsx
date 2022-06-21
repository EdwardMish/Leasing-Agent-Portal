import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Button } from '../../../../Shared/Button/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { TextArea } from '../../../../Shared/Forms';
import { Submit } from '../../../../Shared/Forms/Button';
import { Hidden } from '../../../../Shared/Forms/Input';
import { Select } from '../../../../Shared/Forms/Select';

import { Note } from '../../../../State/Inspections/Types/Note';
import { Photo } from '../../../../State/Inspections/Types/Photo';

import { InspectionsApp } from '../../../../State';
import { Property } from '../../../../State/Inspections/App/Types/Property';
import { Interaction } from '../../../../State/Inspections/App/Types/Interaction';
import { InspectionCategories } from '../../../../State/Inspections/Types';

import CategorySelect from '../CategorySelect';
import NoteDisplay from '../Notes/NoteDisplay';
import AddPhotoRowButton from '../Photos/AddPhotoRowButton';
import RequiresFollowUp from '../RequiresFollowUp';

import formStyles = require('../../../../Shared/Forms/forms.module.css');

const noteValidationSchema = Yup.object().shape({
    note: Yup.string().required('Note is required'),
    categoryId: Yup.number().required('Category is required.'),
});

interface Properties {
    propertyId: number;
    interaction: Interaction;
    setOccupant: (occupantId: number) => Promise<void>;
    saveNote: (note: Note) => Promise<void>;
    savePhoto: (photo: Photo) => Promise<void>;
    completeInteraction: (occupantId: number) => Promise<void>;
}

export default ({
    propertyId,
    interaction,
    setOccupant,
    saveNote,
    savePhoto,
    completeInteraction,
}: Properties): React.ReactElement => {
    const propertiesAreLoaded: boolean = useSelector(InspectionsApp.selectors.propertiesAreLoaded);
    const property: Property = useSelector(InspectionsApp.selectors.property(propertyId));

    return (
        <Formik
            initialValues={{
                occupantId: interaction ? interaction.occupantId : 0,
                note: {
                    id: 0,
                    note: '',
                    followUp: false,
                    categoryId: 1,
                },
                notes: interaction ? interaction.notes : ([] as Note[]),
                photos: interaction ? interaction.photos : ([] as Photo[]),
            }}
            onSubmit={({ occupantId }) => completeInteraction(occupantId)}
            validationSchema={Yup.object().shape(
                {
                    occupantId: Yup.number().min(1, 'Select a neighbor').required('Select a neighbor'),
                    notes: Yup.array().when(['photos'], {
                        is: (photos: any[]) => !!photos && photos.length > 0,
                        then: Yup.array().nullable(),
                        otherwise: Yup.array().of(noteValidationSchema).min(1, 'At least 1 note or photo is required.'),
                    }),
                    photos: Yup.array().when(['notes'], {
                        is: (notes: any[]) => !!notes && notes.length > 0,
                        then: Yup.array().nullable(),
                        otherwise: Yup.array().min(1, 'At least 1 note or photo is required.'),
                    }),
                },
                [['notes', 'photos']],
            )}
        >
            {({ values, isSubmitting, setFieldError, setFieldTouched, setFieldValue, isValid }) => (
                <Form>
                    <Select
                        id="occupantId"
                        label="Neighbor"
                        name="occupantId"
                        hideLabel
                        required
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setOccupant(parseInt(e.target.value, 10));
                        }}
                        style={{ width: '100%', margin: '1rem 0 1rem', backgroundColor: 'white' }}
                    >
                        <option value="0">Select Neighbor</option>
                        {propertiesAreLoaded &&
                            property.occupants.map(({ id, name }) => (
                                <option
                                    key={`occupant-interaction-${id}`}
                                    id={`occupant-select-${id}`}
                                    value={id}
                                    label={name}
                                >
                                    {name}
                                </option>
                            ))}
                    </Select>
                    <ErrorMessage name="notes">
                        {(errorMessage: string) => <p className={formStyles.Error}>{errorMessage}</p>}
                    </ErrorMessage>
                    <ErrorMessage name="photos">
                        {(errorMessage: string) => <p className={formStyles.Error}>{errorMessage}</p>}
                    </ErrorMessage>

                    <FieldArray
                        name="notes"
                        render={(arrayHelpers) => (
                            <div>
                                {!!interaction &&
                                    values.notes.map((note) => (
                                        <NoteDisplay
                                            key={`note-${note.id}`}
                                            display={note.note || ''}
                                            id={note.id}
                                            categoryId={note.categoryId}
                                            followUp={note.followUp}
                                            editable
                                            onEdit={(noteId: number) => {
                                                const newNote = values.notes.find((_) => _.id === noteId);

                                                if (newNote) {
                                                    setFieldValue('note.id', newNote.id);
                                                    setFieldValue('note.note', newNote.note);
                                                    setFieldValue('note.followUp', newNote.followUp);
                                                    setFieldValue('note.categoryId', newNote.categoryId);
                                                }
                                            }}
                                            isEditing={values.note.id === note.id}
                                            cancelEdit={() => {
                                                setFieldValue('note.id', 0);
                                                setFieldValue('note.note', '');
                                                setFieldValue('note.followUp', false);
                                                setFieldValue('note.categoryId', 1);
                                            }}
                                        />
                                    ))}
                                <Hidden id="note.id" name="note.id" label="note.id" />
                                <div style={{ margin: '1rem 0 1rem' }}>
                                    <TextArea label="Note Entry" id="note" name="note.note" placeholder="Enter Note..." />
                                    <ErrorMessage name="note.note" />
                                </div>
                                <RequiresFollowUp name="note.followUp" />
                                <FlexWrapper align="center" justify="between">
                                    <CategorySelect name="note.categoryId" />
                                    <Button
                                        callback={() => {
                                            const note = {
                                                id: values.note.id === 0 ? Date.now() : values.note.id,
                                                note: values.note.note,
                                                followUp: !!values.note.followUp,
                                                categoryId: values.note.categoryId,
                                            };

                                            noteValidationSchema
                                                .validate(note)
                                                .then(() => {
                                                    setFieldValue('note.id', 0);
                                                    setFieldValue('note.note', '');
                                                    setFieldValue('note.followUp', false);
                                                    setFieldValue('note.categoryId', InspectionCategories.Property);

                                                    const noteIndex = values.notes.findIndex((_) => _.id === note.id);

                                                    if (noteIndex !== -1) {
                                                        arrayHelpers.replace(noteIndex, note);
                                                    } else {
                                                        arrayHelpers.push(note);
                                                    }

                                                    saveNote(note);
                                                })
                                                .catch((err) => {
                                                    setFieldTouched('note.note');
                                                    setFieldError('note.note', err.errors[0]);
                                                });
                                        }}
                                        text={values.note.id === 0 ? 'Add Note' : 'Update Note'}
                                        style={{ marginLeft: '1rem' }}
                                    />
                                </FlexWrapper>
                            </div>
                        )}
                    />
                    <FieldArray
                        name="photos"
                        render={(arrayHelpers) => (
                            <div style={{ marginTop: '1rem' }}>
                                <h3>Photos</h3>
                                <p
                                    style={{
                                        fontStyle: 'italic',
                                        fontSize: '.875rem',
                                    }}
                                >
                                    All images will upload when Interaction is completed.
                                </p>
                                {!!interaction &&
                                    values.photos.map(
                                        (photo) =>
                                            photo.file && (
                                                <div key={`photo-${photo.id}`} style={{ margin: '1rem 0' }}>
                                                    <img
                                                        alt={`new interaction photo ${photo.id}`}
                                                        src={URL.createObjectURL(photo.file)}
                                                        onLoad={(e) => {
                                                            URL.revokeObjectURL(e.currentTarget.src);
                                                        }}
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                            ),
                                    )}
                                <AddPhotoRowButton
                                    addFiles={(files: File[]) => {
                                        const currentTime: number = Date.now();

                                        files.forEach((file: File, index: number) => {
                                            const photo: Photo = {
                                                id: currentTime + index,
                                                followUp: false,
                                                categoryId: InspectionCategories.Property,
                                                file,
                                                interactionId: interaction.id,
                                            };

                                            arrayHelpers.push(photo);

                                            savePhoto(photo);
                                        });
                                    }}
                                />
                            </div>
                        )}
                    />

                    <Submit text="Save Interaction" withMarginTop fullWidth disable={isSubmitting || !isValid} />
                </Form>
            )}
        </Formik>
    );
};
