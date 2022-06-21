import { DocumentLink } from '../../Types';

export const mapNoteAttachmentToDocumentLink = (
    requestId: number,
    noteId: number,
    name: string,
): DocumentLink => {
    const identifier = encodeURIComponent(name);

    return {
        title: name,
        link: `http://localhost/requests/${requestId}/notes/${noteId}/attachments/${name}/download`,
        identifier,
    };
};
