import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { OccupantLinkList } from '../../Shared/Occupant/OccupantLinkList';
import { LoadingContent, NoContent } from '../../Shared/PageElements';
import { PageWrapper } from '../../Shared/PageWrapper';
import { TabStates } from '../../Shared/TabStates';
import { Locations } from '../../State';
import { Occupant } from '../../State/Occupants/Types/Occupant';
// TODO: Cannot use Occupant from shared state, have to use 'Occupant State'
import { Property, Space } from '../../State/Shared/Types';
import { Route } from '../../Types';
import { getRootPath } from '../../utils';
import { mapOccupantResponseToOccupant } from '../../utils/Mappers';
import sortOccupantsByLease from '../../utils/sortOccupantsByLease';
import { OccupantSummary } from '../Sales/OccupantSummary';

enum ViewStates {
    Current = 0,
    Past = 1,
    Future = 2,
}

interface SortSet {
    [ViewStates.Current]: Occupant[];
    [ViewStates.Past]: Occupant[];
    [ViewStates.Future]: Occupant[];
}

const defaultSort: SortSet = {
    [ViewStates.Current]: [],
    [ViewStates.Past]: [],
    [ViewStates.Future]: [],
};

export default (): React.ReactElement => {
    const match = useRouteMatch();

    const { spaceId, propertyId } = useParams<{ spaceId: string; propertyId: string }>();

    const target = getRootPath(match.path, '/locations');
    const rootRoute = `${target}/${propertyId}`;

    Locations.Hooks.useLocationsSpacesFromState(propertyId);

    const { areLoaded, spaceOccupants } = Locations.Hooks.useLocationsSpaceOccupantsFromState(propertyId, spaceId);

    const [sortedOccupants, setSortedOccupants] = React.useState<SortSet>(defaultSort);
    const [currentView, setCurrentView] = React.useState<ViewStates>(ViewStates.Current);

    const property: Property = useSelector(Locations.selectors.property(propertyId));
    const space: Space = useSelector(Locations.selectors.space(propertyId, spaceId));

    const linkBuilder = (propertyIdArg: number, id: number): string => `${target}/${propertyIdArg}/occupants/${id}/details`;

    React.useEffect(() => {
        const sortSet: SortSet = sortOccupantsByLease(spaceOccupants.map((o) => mapOccupantResponseToOccupant(o)));

        setSortedOccupants(sortSet);
    }, [JSON.stringify(spaceOccupants)]);

    const routes: Route[] = [
        { target, display: 'Locations' },
        { target: rootRoute, display: property?.name || '' },
        { target: `${rootRoute}/spaces`, display: 'Spaces' },
    ];

    const breadCrumbs = {
        current: space?.name ? `${space.name}` : '',
        routes,
    };

    const handleTabs = (value: number) => {
        setCurrentView(value);
    };

    const tabs = [
        { name: `Current (${sortedOccupants[ViewStates.Current].length})`, callBack: handleTabs },
        { name: `Past (${sortedOccupants[ViewStates.Past].length})`, callBack: handleTabs },
        { name: `Future (${sortedOccupants[ViewStates.Future].length})`, callBack: handleTabs },
    ];

    return (
        <PageWrapper pageTitle={`Locations | ${space?.name || ''} @ ${property?.name || ''}`} breadCrumbs={breadCrumbs}>
            {areLoaded ? (
                <>
                    <OccupantSummary
                        noMarginTop
                        occupantName={space?.name ? `Space ${space.name}` : ''}
                        propertyName={property?.name || ''}
                        headerTags={['h1', 'h3']}
                    />
                    {space.address && (
                        <p
                            style={{
                                fontSize: '0.875rem',
                                fontWeight: 400,
                                lineHeight: '1',
                                margin: '0 0 1rem',
                                color: 'rgb(140, 140, 140)',
                            }}
                        >
                            {space.address}
                        </p>
                    )}
                    <TabStates tabs={tabs} />
                    {sortedOccupants[currentView].length ? (
                        <OccupantLinkList
                            occupants={sortedOccupants[currentView]}
                            propertyId={parseInt(propertyId, 10)}
                            rootPath={target}
                            linkBuilder={linkBuilder}
                        />
                    ) : (
                        <NoContent message="There are no occupants to show." />
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
};
