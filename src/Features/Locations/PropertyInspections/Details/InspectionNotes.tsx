import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Note } from '../../../../State/Inspections/Types/Note';

import { selectors } from '../../../../State/Locations';

import NoteRow from '../../../../Shared/Inspections/DetailRows/NoteRow';

const InspectionNotes = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const notes: Note[] = useSelector(selectors.notes(inspectionId))

    return (
        <>
            {
                notes.map((note: Note) => (
                    <React.Fragment key={`note-list-${note.id}`}>
                        <NoteRow note={note} />
                    </React.Fragment>
                ))
            }
        </>
    )
}

export default InspectionNotes;