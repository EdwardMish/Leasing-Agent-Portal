import { Documents } from 'API';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { DocumentList } from '../../../Shared/Documents';
import { LoadingContent, NoContent, Title } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { CurrentUserState, Documents as DocumentsState } from '../../../State';
import { DocumentLink, Route, UserPermissions } from '../../../Types';
import { getRootPath } from '../../../utils';

export const TenantDocuments: React.FC<{}> = () => {
    let { path } = useRouteMatch();
    let { occupantId, propertyId } = useParams<{ occupantId: string; propertyId: string }>();

    const { areLoaded } = DocumentsState.Hooks.usePropertiesFromDocumentState();

    const userHasPermissions: boolean = useSelector(
        CurrentUserState.selectors.currentUserHasPermissionForOccupant(UserPermissions.ViewDocuments, occupantId)
    );

    const property: DocumentsState.Types.DocumentPropertyWithOccupants | null = useSelector(
        DocumentsState.selectors.property(propertyId)
    );

    const occupant: DocumentsState.Types.DocumentPropertyWithOccupants | null = useSelector(
        DocumentsState.selectors.occupant(propertyId, occupantId)
    );

    const target = getRootPath(path, '/documents');

    const routes: Route[] = [
        { target, display: 'Properties' },
        { target: `${target}/${propertyId}`, display: property?.name || '' },
    ];

    const breadCrumbs = {
        current: occupant?.name || '',
        routes,
    };

    const [documentLinks, setDocumentLinks] = React.useState<DocumentLink[]>([]);

    React.useEffect(() => {
        Documents.API.getDocuments(occupantId).then((res) => {
            setDocumentLinks(res);
        });
    }, []);

    return (
        <>
            {areLoaded ? (
                !!occupant ? (
                    userHasPermissions ? (
                        <PageWrapper pageTitle={`Documents | ${occupant?.name || ''}`} breadCrumbs={breadCrumbs}>
                            <Title title={occupant.name} />
                            <DocumentList documents={documentLinks} />
                        </PageWrapper>
                    ) : (
                        <NoContent message={`Permission denied for ${occupant.name}`} />
                    )
                ) : (
                    <NoContent message="No neighbor found" />
                )
            ) : (
                <LoadingContent />
            )}
        </>
    );
};
