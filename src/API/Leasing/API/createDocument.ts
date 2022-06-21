import POST from 'API/utils/POST';

interface Document {
    name: string;
}
interface CreatedDocument {
    documentId: number;
}

const createDocument = async (leadId: number, applicationID: number, values: Document): Promise<CreatedDocument> =>
    POST.postFormData<Document, CreatedDocument>(
        `${API_ROOT}/leasing/leads/${leadId}/personal-applications/${applicationID}/document-groups`,
        values,
    );

export default createDocument;
