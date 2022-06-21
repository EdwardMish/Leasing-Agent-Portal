import { Documents } from 'API';
import * as React from 'react';
import { DocumentList } from '../../Shared/Documents';
import DynamicContent from '../../Shared/PageElements/DynamicContent';
import { DocumentLink } from '../../Types';

interface OccupantDocumentsProps {
    occupantId: number | string;
}

const OccupantDocuments: React.FC<OccupantDocumentsProps> = ({ occupantId }) => {
    const [documentLinks, setDocumentLinks] = React.useState<DocumentLink[]>([]);
    const [documentsLoaded, setDocumentsLoaded] = React.useState<boolean>(false);
    const [hasErrorState, toggleErrorState] = React.useState<boolean>(false);

    React.useEffect(() => {
        Documents.API.getDocuments(occupantId)
            .then((res) => {
                setDocumentLinks(res);
                setDocumentsLoaded(true);
            })
            .catch(() => {
                setDocumentsLoaded(true);
                toggleErrorState(true);
            });
    }, [occupantId]);

    return (
        <DynamicContent
            loaded={documentsLoaded}
            noContent={hasErrorState}
            noContentMessage="We are not able to load documents at this time."
        >
            <DocumentList documents={documentLinks} />
        </DynamicContent>
    );
};

export default OccupantDocuments;

