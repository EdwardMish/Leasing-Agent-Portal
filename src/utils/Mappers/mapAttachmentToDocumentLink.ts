import { RequestsTypes } from 'API/Requests';
import { DocumentLink } from '../../Types';

export const mapAttachmentToDocumentLink = (requestId: number, { name }: RequestsTypes.AttachmentResponse): DocumentLink => {
    const identifier = encodeURIComponent(name);

    return {
        title: name,
        link: `${API_ROOT}/requests/${requestId}/attachments/${identifier}`,
        identifier,
    };
};

