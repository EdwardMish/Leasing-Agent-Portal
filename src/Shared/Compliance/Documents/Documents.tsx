import * as React from 'react';

import Compliance, { ComplianceDocument, ComplianceType, ComplianceTypeDisplayNames } from '../../../API/Compliance';

import { Download, IconColors } from '../../../Icons';

import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { LoadingContent, NoContent } from '../../../Shared/PageElements';
import { AuthenticatedLink } from '../../Documents/AuthenticatedLink';

interface DocumentsProps {
    occupantId: number;
    type: ComplianceType;
}

export const Documents: React.FC<DocumentsProps> = ({ occupantId, type }) => {
    const [documentsLoaded, setDocumentsLoaded] = React.useState<boolean>(false);
    const [documents, setDocuments] = React.useState<ComplianceDocument[]>([]);

    React.useEffect(() => {
        Compliance.getDocuments(occupantId, type)
            .then((response: ComplianceDocument[]) => {
                setDocuments(response);
                setDocumentsLoaded(true);
            })
            .catch(() => {
                setDocumentsLoaded(true);
            });
    }, [occupantId]);

    return (
        <>
            {documentsLoaded ? (
                <>
                    {documents.length ? (
                        <>
                            {documents.map(({ link, name }: ComplianceDocument) => (
                                <AuthenticatedLink
                                    key={`document-list-download-${link}`}
                                    url={`${link}${link.endsWith('/download') === false ? '/download' : ''}`}
                                    filename={name}
                                    style={{
                                        display: 'block',
                                        borderBottom: '1px solid rgb(220, 220, 220)',
                                        color: '#0071ce',
                                        fontSize: '0.875rem',
                                        lineHeight: '0.875rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <FlexWrapper
                                        align="center"
                                        justify="start"
                                        style={{
                                            padding: '0.5rem',
                                            width: '100%',
                                        }}
                                    >
                                        <Download aspect="1rem" color={IconColors.BrandBlue} />
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                marginLeft: '0.3rem',
                                            }}
                                        >
                                            {name}
                                        </span>
                                    </FlexWrapper>
                                </AuthenticatedLink>
                            ))}
                        </>
                    ) : (
                        <NoContent
                            message={`No ${ComplianceTypeDisplayNames[type] || 'complianceType'} Documents Found`}
                            withMarginTop={false}
                            withMarginBottom={false}
                        />
                    )}
                </>
            ) : (
                <LoadingContent withMarginTop={false} withMarginBottom={false} />
            )}
        </>
    );
};
