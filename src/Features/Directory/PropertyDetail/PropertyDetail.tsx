import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { OccupantLinkList } from '../../../Shared/Occupant/OccupantLinkList';
import { LoadingContent, NoContent } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { PropertyContactList } from '../../../Shared/Property/PropertyContact';
import { TabStates } from '../../../Shared/TabStates';
import { DirectoryState } from '../../../State';
import { Route } from '../../../Types';
import { getRootPath } from '../../../utils';

const styles = require('./property-detail.module.css');

export const PropertyDetail: React.FC<{}> = () => {
    let { path } = useRouteMatch();
    let { propertyId } = useParams<{ propertyId: string }>();

    const [view, setView] = React.useState<number>(0);

    const { areLoaded } = DirectoryState.Hooks.usePropertiesFromDirectoryState();

    const property: DirectoryState.Types.DirectoryPropertyWithOccupants = useSelector(
        DirectoryState.selectors.property(parseInt(propertyId))
    );

    const target = getRootPath(path, '/directory');

    const routes: Route[] = [{ target, display: 'Directory' }];

    const breadCrumbs = {
        current: property?.name || '',
        routes,
    };

    const tabs = [
        {
            name: 'Neighbors',
            callBack: () => {
                setView(0);
            },
        },
        {
            name: 'Property Contacts',
            callBack: () => {
                setView(1);
            },
        },
    ];

    const renderView = (view: number) => {
        switch (view) {
            case 0:
                return areLoaded ? (
                    property.occupants && property.occupants.length > 0 ? (
                        <OccupantLinkList occupants={property.occupants} propertyId={property.id} rootPath={target} />
                    ) : (
                        <NoContent message={`No neighbors found for ${property.name}`} />
                    )
                ) : (
                    <LoadingContent />
                );
            case 1:
                return <PropertyContactList propertyId={propertyId} />;
            default:
                return renderView(0);
        }
    };

    return areLoaded ? (
        <PageWrapper pageTitle={`Directory | ${property?.name || ''}`} breadCrumbs={breadCrumbs}>
            <h1>{property?.name || ''}</h1>
            <div className={styles.PropertyDetail}>
                <TabStates tabs={tabs} />
                {renderView(view)}
            </div>
        </PageWrapper>
    ) : (
        <LoadingContent />
    );
};
