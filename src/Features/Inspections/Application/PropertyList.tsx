import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { InspectionsApp } from 'State';

import { LoadingContent, NoContent } from 'Shared/PageElements';

import styles = require('./inspections.module.css');
import { Search } from 'Shared/Search';

export default (): React.ReactElement => {
    const properties: InspectionsApp.Types.Property[] = useSelector(InspectionsApp.selectors.propertiesList);
    const propertiesAreLoaded: boolean = useSelector(InspectionsApp.selectors.propertiesAreLoaded);
    const [filteredProperties, setFilteredProperties] = React.useState<InspectionsApp.Types.Property[]>([]);

    React.useEffect(() => {
        if (properties) setFilteredProperties(properties);
    }, [properties]);

    const filterPropertiesHandler = async (term: string) => {
        const newFilteredProperties = await properties.filter((property) =>
            property.propertyName.toLowerCase().includes(term.toLowerCase()),
        );
        setFilteredProperties(newFilteredProperties);
    };

    const resetPropertiesFilter = () => {
        setFilteredProperties(properties);
    };

    return (
        <div className={styles.InspectionsWrapper}>
            {propertiesAreLoaded ? (
                properties.length ? (
                    <div className={styles.InspectionsPropertyList}>
                        <div className={styles.PropertiesFilter}>
                            <Search
                                placeholder="Filter properties"
                                handler={filterPropertiesHandler}
                                clearCallback={resetPropertiesFilter}
                                debounceDelay={500}
                            />
                        </div>
                        {filteredProperties.map((property) => (
                            <Link
                                to={`/app/inspections/${property.propertyId}`}
                                key={`{property-list-${property.propertyId}`}
                            >
                                <div className={styles.InspectionsPropertyLink}>
                                    <p>{property.propertyName}</p>
                                    {!!property.inspectionDraftId && (
                                        <p
                                            style={{
                                                fontStyle: 'italic',
                                                fontSize: '.75rem',
                                                marginTop: '0.5rem',
                                            }}
                                        >
                                            In Progress
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <NoContent message="No properties available." />
                )
            ) : (
                <LoadingContent />
            )}
        </div>
    );
};

