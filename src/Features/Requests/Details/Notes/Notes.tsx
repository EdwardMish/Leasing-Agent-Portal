import { RequestsAPI, RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { IconColors } from 'Icons';
import { DocumentList } from 'Shared/Documents/DocumentList';
import { LoadingContent, NoContent } from 'Shared/PageElements';
import { Note } from './Note';
import { useCurrentUser } from 'State/CurrentUser/Hooks';
import { userIsOwnerOperatorAdmin, userIsOwnerOperator } from 'utils/Users';
import styles from './notes.module.css';

interface NotesProps {
    clearRefresh?: () => void;
    forceRefresh?: boolean;
    readOnly?: boolean;
    requestId: number;
}

export const Notes: React.FC<NotesProps> = ({ clearRefresh, forceRefresh = false, requestId }) => {
    const { currentUser } = useCurrentUser();
    const [notes, setNotes] = React.useState<RequestsTypes.NotesResponse[]>([]);
    const [loadingNotes, setLoadingNotes] = React.useState<boolean>(false);
    const [loadingError, setLoadingError] = React.useState<boolean>(false);

    const canEditUpdateRequest = (note: RequestsTypes.NotesResponse): boolean =>
        userIsOwnerOperatorAdmin(currentUser) || note.createdByUserId === currentUser.id;

    const loadNotes = () => {
        setLoadingNotes(true);

        RequestsAPI.getNotes(requestId)
            .then((notesResponse) => {
                userIsOwnerOperator(currentUser) ? setNotes(notesResponse) : setNotes(notesResponse.filter((n) => n.public));
                setLoadingNotes(false);
            })
            .catch(() => {
                setLoadingNotes(false);
                setLoadingError(true);
            });
    };

    React.useEffect(() => {
        loadNotes();
    }, [requestId, currentUser]);

    React.useEffect(() => {
        if (forceRefresh) {
            loadNotes();

            if (!!clearRefresh) clearRefresh();
        }
    }, [forceRefresh]);

    const deleteAttachment = async (noteId: number, identifier: string | number) => {
        await RequestsAPI.deleteNoteAttachment(requestId, noteId, identifier);
        loadNotes();
    };

    return (
        <>
            {loadingNotes ? (
                <LoadingContent />
            ) : loadingError ? (
                <NoContent
                    allowReload
                    message={`We were not able to load updates for request #${requestId}.`}
                    reloadAction={loadNotes}
                />
            ) : !!notes && !!notes.length ? (
                <ul className={styles.RequestNotes}>
                    {notes.map((note) => (
                        <li className={styles.requestedNote} key={`note-detail-${note.createdDate}`}>
                            <Note note={note} requestId={requestId} readOnly={!canEditUpdateRequest(note)} />
                            {!!(note.attachments.length > 0) && (
                                <div
                                    style={{
                                        marginBottom: '-1rem',
                                        padding: '0.5rem',
                                        border: `1px solid ${IconColors.OffWhite}`,
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <h3 style={{ fontSize: '0.875rem', margin: '0 0 0.5rem' }}>Attachments</h3>
                                    <DocumentList
                                        documents={note.attachments.map(({ name, link }) => ({
                                            title: name,
                                            link: link,
                                            identifier: encodeURIComponent(name),
                                        }))}
                                        noContentMessage={`No attachments uploaded.`}
                                        allowRemoval={userIsOwnerOperator(currentUser)}
                                        removeItem={async (identifier: string | number) =>
                                            await deleteAttachment(note.id, identifier)
                                        }
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <NoContent message="There are no updates for this request." />
            )}
        </>
    );
};

