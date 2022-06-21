import { RequestsTypes } from 'API/Requests';
import { Requests } from '../../State';

export const mapRequestNotesResponseToNotes = (
    requestNotesResponse: RequestsTypes.NotesResponse[],
): Requests.Types.RequestNote[] =>
    requestNotesResponse.map(({ createdBy, createdDate, note, public: noteIsPublic }: RequestsTypes.NotesResponse) => ({
        createdBy,
        createdDate,
        note,
        noteIsPublic,
    }));

