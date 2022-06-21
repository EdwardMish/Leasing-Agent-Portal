import * as React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { DirectoryState, Documents } from '../../../State';
import { PropertyWithOccupants } from '../../../State/Shared/Types';

import { Search } from '../../Search';
import { NoContent } from '../../PageElements';

const styles = require('./property-list.module.css');

type Property = PropertyWithOccupants | DirectoryState.Types.DirectoryPropertyWithOccupants | Documents.Types.DocumentPropertyWithOccupants

interface PropertyListProps {
    properties: Property[];
    linkBuilder?: (base: string, id: number | string) => string;
    occupantLinkBuilder?: (base: string, propertyId: number | string, occupantId: number | string) => string;
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties, linkBuilder, occupantLinkBuilder }) => {
    const { path } = useRouteMatch();

    const [baseProperties, setBaseProperties] = React.useState<Property[]>(properties);
    const [filteredProperties, setFilteredProperties] = React.useState<Property[]>(properties);
    const [activeSearch, toggleActiveSearch] = React.useState<boolean>(false);

    React.useEffect(() => {
        setBaseProperties(properties);
        setFilteredProperties(properties);
    }, [properties.length]);

    const handleSearch = (searchTerm: string): void => {
        toggleActiveSearch(true);

        const term = searchTerm.toLowerCase();

        const filtered: PropertyWithOccupants[] = baseProperties
            .reduce((agg, curr: PropertyWithOccupants) => {
                const propertyIsValid: boolean = curr.name.toLowerCase().includes(term);
                const propertyHasValidOccupants: boolean = !!curr.occupants
                    .map(({ name }) => name.toLowerCase())
                    .filter((n) => n.toLowerCase().includes(term))
                    .length;

                return propertyIsValid || propertyHasValidOccupants
                    ? [
                        ...agg,
                        {
                            ...curr,
                            occupants: curr.occupants.filter((o) => o.name.toLowerCase().includes(term)),
                        },
                    ]
                    : agg;
            }, []);

        setFilteredProperties(filtered);
    };

    const clearSearch = (): void => {
        setFilteredProperties(baseProperties);

        toggleActiveSearch(false);
    };

    const link = (id: number | string) => (linkBuilder ? linkBuilder(path, id) : `${path}/${id}`);

    const occupantLink = (propertyId: number | string, occupantId: number | string) => (occupantLinkBuilder ? occupantLinkBuilder(path, propertyId, occupantId) : `${path}/${propertyId}/${occupantId}`);

    return (
        <div className={styles.PropertyListPage}>
            <Search
                handler={handleSearch}
                placeholder="Search Properties and Neighbors"
                cleanUpCallback={clearSearch}
                clearCallback={clearSearch}
                debounceDelay={500}
            />
            <div className={styles.PropertyList}>
                {
                    filteredProperties.length
                        ? (
                            <>
                                {
                                    filteredProperties.map(({ id, name, occupants }: PropertyWithOccupants) => (
                                        <div key={`property-list-${id}`}>
                                            <Link to={link(id)}>
                                                <div className={styles.PropertyListItem}>
                                                    <h2>{name}</h2>
                                                </div>
                                            </Link>
                                            {
                                                activeSearch && !!occupants.length
                                            && (
                                                <div className={styles.OccupantListItemWrapper}>
                                                    {
                                                        occupants.map(({ id: occupantId, name: occupantName }) => (
                                                            <Link key={`search-occupants-${occupantId}`} to={occupantLink(id, occupantId)}>
                                                                <div className={styles.OccupantListItem}>
                                                                    <p>{occupantName}</p>
                                                                </div>
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            )
                                            }
                                        </div>
                                    ))
                                }
                            </>
                        )
                        : (
                            <>
                                {
                                    activeSearch
                                        ? <NoContent message="No Properties or Neighbors by that name." />
                                        : <NoContent message="There are no Properties." />
                                }
                            </>
                        )
                }
            </div>
        </div>
    );
};
