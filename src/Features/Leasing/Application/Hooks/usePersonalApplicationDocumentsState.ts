import { API as LeasingAPI } from 'API/Leasing';
import { Document } from 'API/Leasing/Types/Document';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import selectors from 'State/Leasing/selectors';
import { LeasingApplication } from 'State/Leasing/Types';
import { convertURLBlobToFile } from 'utils';

export interface useDocumentsStateReturn {
    getDocuments: () => Promise<void>;
    documents: Document[];
    totalDocuments: number;
    loadingDocuments: boolean;
    createCustomDocument: (any) => Promise<void>;
    createRequiredDocument: (number, any) => Promise<void>;
    selectRequiredDocuments: (arg0?: Document[]) => Document[];
    selectCompletedDocuments: (arg0?: Document[]) => Document[];
    selectRequestedDocuments: (arg0?: Document[]) => Document[];
    selectAdditionalDocuments: (arg0?: Document[]) => Document[];

    creatingDocument: boolean;
    deleteDocument: (number) => Promise<void>;
    deletingDocument: boolean;
    errorMessage: string;
}

const useDocumentsState = (): useDocumentsStateReturn => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const [creatingDocument, setCreatingDocument] = useState(false);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [deletingDocument, setDeletingDocument] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const activeApplication: LeasingApplication | undefined = useSelector(selectors.leasingApplication);

    const getDocuments = async (): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to retrive documents with an undefined application');

        try {
            setLoadingDocuments(true);
            const response = await LeasingAPI.getDocuments(activeApplication?.id);
            setDocuments(response);
            setTotalDocuments(response.length);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setLoadingDocuments(false);
        }
    };

    const formatDocumentData = async (values): Promise<Document> => {
        const documents = await Promise.all<File>(values.attachment.map((att) => convertURLBlobToFile(att)));
        const documentData: Document = {
            name: values.documentlabel,
            documents,
        };

        return documentData;
    };

    const formatRequiredDocumentsData = async (values): Promise<Document> => {
        const documents = await Promise.all<File>(values.attachment.map((att) => convertURLBlobToFile(att)));
        const documentData: Document = {
            documents,
        };

        return documentData;
    };

    const createCustomDocument = async (values): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to create new document with an undefined application');

        try {
            setCreatingDocument(true);
            const documentData = await formatDocumentData(values);
            await LeasingAPI.createPersonalApplicationDocument(activeApplication?.id, documentData);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setCreatingDocument(false);
        }
    };

    const createRequiredDocument = async (requiredDocumentId: number, values): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to create new document with an undefined application');

        try {
            setCreatingDocument(true);
            const documentData = await formatRequiredDocumentsData(values);
            await LeasingAPI.updatePersonalApplicationRequiredDocument(
                activeApplication?.id,
                requiredDocumentId,
                documentData,
            );
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setCreatingDocument(false);
        }
    };

    const deleteDocument = async (document: Document): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to delete the document with an undefined application');

        try {
            setDeletingDocument(true);
            await LeasingAPI.deleteDocument(activeApplication?.id, document);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('');
            throw error;
        } finally {
            setDeletingDocument(false);
        }
    };

    const selectRequiredDocuments = (_documents = documents) => _documents.filter((doc) => !doc?.dateUploaded);
    const selectCompletedDocuments = (_documents = documents) => _documents.filter((doc) => doc?.dateUploaded);
    const selectRequestedDocuments = (_documents = documents) => _documents.filter((doc) => doc?.dateRequested);
    const selectAdditionalDocuments = (_documents = documents) => _documents.filter((doc) => !doc?.dateRequested);

    return {
        getDocuments,
        documents,
        totalDocuments,
        loadingDocuments,
        createCustomDocument,
        selectRequiredDocuments,
        selectCompletedDocuments,
        selectRequestedDocuments,
        selectAdditionalDocuments,
        createRequiredDocument,
        creatingDocument,
        deleteDocument,
        deletingDocument,
        errorMessage,
    };
};

export default useDocumentsState;
