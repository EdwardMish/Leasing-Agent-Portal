import { ComplianceDocument } from '../../API/Compliance/Types';
import { DocumentLink } from '../../Types';

export const mapComplianceDocumentToDocumentLink = ({
    name,
    link,
}: ComplianceDocument): DocumentLink => ({
    title: name,
    link,
    identifier: name,
});
