import * as React from 'react';
import { useDispatch } from 'react-redux';

import Compliance, { ComplianceType } from '../../../API/Compliance';

import { DocumentLink } from '../../../Types';

import { globalMessageActionCreators } from '../../../State';

import { mapComplianceDocumentToDocumentLink } from '../../../utils/Mappers';

import { DocumentList } from '../../../Shared/Documents';

interface UploadedDocumentListProps {
    complianceType: ComplianceType;
    occupantId: number;
}

const UploadedDocumentList: React.FC<UploadedDocumentListProps> = ({ complianceType, occupantId }) => {
    const dispatch = useDispatch();

    const [docs, setDocs] = React.useState<DocumentLink[]>([]);

    const loadDocs = () => {
        Compliance.getDocuments(occupantId, complianceType)
            .then((docs) => setDocs(docs.map((doc) => mapComplianceDocumentToDocumentLink(doc))))
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        'We were not able to load documents at this time.',
                    ),
                );
            });
    };

    React.useEffect(() => {
        loadDocs();
    }, [complianceType, occupantId]);

    const handleRemove = (identifier: string) => {
        Compliance.deleteDocument(occupantId, complianceType, identifier)
            .then(() => {
                loadDocs();
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('We could not delete the document.'));
            });
    };

    return (
        <>
            {docs.length ? (
                <DocumentList
                    allowRemoval
                    documents={docs}
                    noContentMessage="No documents loaded."
                    removeItem={handleRemove}
                />
            ) : null}
        </>
    );
};

export default UploadedDocumentList;
