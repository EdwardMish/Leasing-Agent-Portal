import { OccupantContactList } from 'Features/Directory/Occupant/OccupantContact/OccupantContactList';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { LoadingContent, SecondaryTitle } from '../../../../Shared/PageElements';
import { PageWrapper } from '../../../../Shared/PageWrapper';
import { DirectoryState } from '../../../../State';
import { Property } from '../../../../State/Shared/Types';
import { Route } from '../../../../Types';
import { getRootPath } from '../../../../utils';

const styles = require('./occupant-detail.module.css');

export const OccupantDetail: React.FC<{}> = () => {
    let { path } = useRouteMatch();

    let { propertyId, occupantId } = useParams<{ propertyId: string; occupantId: string }>();

    const property: Property = useSelector(DirectoryState.selectors.property(parseInt(propertyId)));
    const occupant: DirectoryState.Types.DirectoryOccupant = useSelector(
        DirectoryState.selectors.occupant(parseInt(propertyId), parseInt(occupantId))
    );

    const target = getRootPath(path, '/directory');

    const routes: Route[] = [
        { target, display: 'Directory' },
        { target: `${target}/${propertyId}`, display: property?.name || '' },
    ];

    const breadCrumbs = {
        current: occupant?.name || '',
        routes,
    };

    return occupant && occupant.hasOwnProperty('id') ? (
        <PageWrapper pageTitle={`Directory | ${occupant?.name || ''}`} breadCrumbs={breadCrumbs}>
            <h1 className={styles.OccupantDetailTitle}>{occupant.name}</h1>
            <SecondaryTitle title="Contacts" />
            <OccupantContactList propertyId={propertyId} occupantId={occupantId} rootPath={target} />
        </PageWrapper>
    ) : (
        <LoadingContent />
    );
};
