import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IconColors } from '../../../../Icons';

import NoteRow from '../../../../Shared/Inspections/DetailRows/NoteRow';
import { NoContent } from '../../../../Shared/PageElements';

import { selectors } from '../../../../State/Inspections/Feature';
import { Note } from '../../../../State/Inspections/Types/Note';

const InspectionNotes = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const notes: Note[] = useSelector(selectors.notes(inspectionId));

    return (
        <>
            {!!notes && !!notes.length ? (
                <>
                    {notes.map((note: Note) => (
                        <div
                            key={`note-list-${note.id}`}
                            style={{
                                border: note.followUp
                                    ? `1px solid ${IconColors.BrandBlue}`
                                    : `1px solid ${IconColors.OffWhite}`,
                                margin: '0 0 0.5rem',
                                borderRadius: '0.25rem',
                                overflow: 'hidden',
                            }}
                        >
                            <NoteRow note={note} />
                            {note.followUp && (
                                <p
                                    style={{
                                        backgroundColor: IconColors.BrandBlue,
                                        color: 'white',
                                        display: 'block',
                                        lineHeight: '1.5rem',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25rem',
                                        margin: 0,
                                        textAlign: 'center',
                                        width: '100%',
                                    }}
                                >
                                    Requires Followup
                                </p>
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <NoContent message="No Notes to Display" />
            )}
        </>
    );
};

export default InspectionNotes;
