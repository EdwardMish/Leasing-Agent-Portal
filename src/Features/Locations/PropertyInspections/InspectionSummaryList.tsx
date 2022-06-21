import React from 'react';
import { format } from 'date-fns';

import { LocationInspectionSummary } from '../../../State/Locations/Types/LocationInspectionSummary';

import { IconColors } from '../../../Icons';

import { Components, Types, utils } from '../../../Shared/Table';

import { ListSkeleton } from '../../Requests/List/Skeletons';

import { columnDisplay, ColumnNames, columns } from './columns';

interface Properties {
    inspectionSummaries: LocationInspectionSummary[];
    linkBuilder?: (id: number) => string;
}

const rowSelectOptions: { value: number, display: number }[] = [
    { value: 25, display: 25 },
    { value: 50, display: 50 },
    { value: 75, display: 75 },
    { value: 100, display: 100 },
];

export default ({
    inspectionSummaries,
    linkBuilder = (inspectionId: number | string) => `/inspections/details/${inspectionId}`,
}: Properties): React.ReactElement => {
    const sort = utils.sortArray;
    const paginate = utils.paginateCollection;

    const initialColumn: ColumnNames = ColumnNames.propertyName;
    const initialRowOption: { value: number, display: number } = rowSelectOptions[0];

    const [sortColumn, setSortColumn] = React.useState<ColumnNames>(initialColumn);
    const [sortDirection, setSortDirection] = React.useState<Types.SortDirection>(Types.SortDirection.ASC);
    const [paginatedItems, setPaginatedItems] = React.useState<Types.PaginatedCollection<LocationInspectionSummary>>(
        paginate<LocationInspectionSummary>(inspectionSummaries, initialRowOption.value),
    );
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(initialRowOption.value);
    const [currentPageOverride, setCurrentPageOverride] = React.useState<number>(0);

    const sortColumns = (operator) => { setSortColumn(operator); };

    const sortDirections = (direction) => { setSortDirection(direction); };

    const handleNumberOfRows = (rowsDisplayed: number): void => {
        setCurrentPage(1);
        setCurrentPageOverride(1);
        setNumberOfRows(rowsDisplayed);
    };

    const handleCurrentPage = (page: number) => { setCurrentPage(page); };

    const clearOverride = () => { setCurrentPageOverride(0); };

    React.useEffect(() => {
        setPaginatedItems(paginate(sort(inspectionSummaries, sortColumn, sortDirection), numberOfRows));
    }, [
        inspectionSummaries,
        numberOfRows,
        sortColumn,
        sortDirection,
    ]);

    const formatData = (key: ColumnNames, summary: LocationInspectionSummary) => (
        key === ColumnNames.createdDate
            ? format(new Date(columnDisplay[key](summary[key])), 'LL/dd/yy')
            : columnDisplay[key](summary[key])
    )

    return (
        <>
            {
                inspectionSummaries.length
                    ? (
                        <>
                            <Components.Header
                                columns={columns}
                                initialSortColumn={ColumnNames.propertyName}
                                initialSortDirection={sortDirection}
                                sortColumnCallback={sortColumns}
                                sortDirectionCallback={sortDirections}
                            />
                            {
                                Object.prototype.hasOwnProperty.call(paginatedItems, currentPage)
                                && !!paginatedItems[currentPage].length
                                && paginatedItems[currentPage].map((inspectionSummary: LocationInspectionSummary) => (
                                    <Components.Row
                                        key={`table-row-${inspectionSummary.id}`}
                                        rowWrapper="link"
                                        linkTarget={linkBuilder(inspectionSummary.id)}
                                    >
                                        {
                                            columns.map(({ operator, width }) => (
                                                <p
                                                    key={`table-row-cell-${inspectionSummary.id}-${operator}`}
                                                    style={{
                                                        width,
                                                        fontSize: '0.75rem',
                                                        lineHeight: '1.5rem',
                                                        color: IconColors.BrandBlue,
                                                    }}
                                                >
                                                    {formatData(operator, inspectionSummary)}
                                                </p>
                                            ))
                                        }
                                    </Components.Row>
                                ))
                            }
                            <Components.Footer
                                numberOfRecords={inspectionSummaries.length}
                                numberOfRowsDisplayedCallback={handleNumberOfRows}
                                currentPageCallback={handleCurrentPage}
                                currentPageOverride={currentPageOverride}
                                clearCurrentPageOverride={clearOverride}
                                rowSelectOptions={rowSelectOptions}
                            />
                        </>
                    )
                    : <ListSkeleton message="No Inspections Found" />
            }
        </>
    );
};
