import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { OccupantLinkList } from '../../../Shared/Occupant/OccupantLinkList';
import { LoadingContent, NoContent, Title } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { Documents, Occupants } from '../../../State';
import { Route } from '../../../Types';
import { getRootPath } from '../../../utils';

export const TenantDocumentsPropertyDetail: React.FC<{}> = () => {
    let { path } = useRouteMatch();

    let { propertyId } = useParams<{ propertyId: string }>();

    const { areLoaded } = Documents.Hooks.usePropertiesFromDocumentState();

    const property: Documents.Types.DocumentPropertyWithOccupants | null = useSelector(
        Documents.selectors.property(propertyId)
    );

    const target = getRootPath(path, '/documents');

    const routes: Route[] = [{ target, display: 'Properties' }];

    const breadCrumbs = {
        current: property?.name || '',
        routes,
    };

    return areLoaded ? (
        <>
            {!!property ? (
                <PageWrapper pageTitle={`Documents | ${property?.name || ''}`} breadCrumbs={breadCrumbs}>
                    <Title title={property?.name} />
                    <OccupantLinkList
                        propertyId={parseInt(propertyId)}
                        occupants={property.occupants.map(
                            (_) => ({ id: _.id, name: _.name, canEdit: true, phone: '' } as Occupants.Types.Occupant)
                        )}
                        rootPath={target}
                        hideNonEditable
                    />
                </PageWrapper>
            ) : (
                <NoContent message="No properties found." />
            )}
        </>
    ) : (
        <LoadingContent />
    );
};
