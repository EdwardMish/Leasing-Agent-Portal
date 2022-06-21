import React from 'react';

import Inspections from '../../../API/Inspections';
import { InspectionSummary } from '../../../API/Inspections/InspectionsTypes/InspectionSummary';

import { Search } from '../../../Shared/Search';

import InspectionsSummaryList from './InspectionsSummaryList';

import { hasSubstring } from '../../../utils/hasSubstring';

export default (): React.ReactElement => {
    const [inspectionSummaries, setInspectionSummaries] = React.useState<InspectionSummary[]>([]);
    const [filteredInspectionSummaries, setFilteredInspectionSummaries] = React.useState<InspectionSummary[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    React.useEffect(() => {
        Inspections.getDraftInspections().then((summaries: InspectionSummary[]) => {
            setInspectionSummaries(summaries);
            setFilteredInspectionSummaries(summaries);
        });
    }, []);

    React.useEffect(() => {
        setFilteredInspectionSummaries(inspectionSummaries.filter((i) => hasSubstring(i.propertyName, searchTerm)));
    }, [searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const cleanUp = (): void => {
        setFilteredInspectionSummaries(inspectionSummaries);
    };

    return (
        <>
            <div style={{ margin: '1rem 0' }}>
                <Search
                    handler={handleSearch}
                    cleanUpCallback={cleanUp}
                    clearCallback={cleanUp}
                    placeholder="Search Property Names"
                />
            </div>
            <InspectionsSummaryList inspectionSummaries={filteredInspectionSummaries} />
        </>
    );
};
