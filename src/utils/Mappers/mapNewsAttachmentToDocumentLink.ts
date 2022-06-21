import { News } from '../../API';
import { DocumentLink } from '../../Types';

export const mapNewsAttachmentToDocumentLink = (newsId: number, { name }: News.Types.Attachment): DocumentLink => ({
    title: name,
    link: `${API_ROOT}/news/${newsId}/attachments/${name}`,
});
