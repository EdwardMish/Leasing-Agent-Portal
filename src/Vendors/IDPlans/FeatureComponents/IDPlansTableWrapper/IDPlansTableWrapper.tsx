import * as React from 'react';

import { ListSkeleton } from '../../../../Features/Requests/List/Skeletons';

import {
    Components as TableComponents,
    Types as TableTypes,
    utils as TableUtils,
} from '../../../../Shared/Table';

interface IDPlansTableWrapperProps<T> {
    columns: TableTypes.TableColumn[];
    dataRecords: T[];
    rowKeys: Array<keyof T>;
    recordsLoaded: boolean;
}

const rowSelectOptions: { value: number, display: number }[] = [
    { value: 10, display: 10 },
    { value: 25, display: 25 },
    { value: 50, display: 50 },
    { value: 75, display: 75 },
    { value: 100, display: 100 },
];

export const IDPlansTableWrapper = <T extends object>({
    children,
    columns,
    dataRecords,
    recordsLoaded,
    rowKeys,
}: IDPlansTableWrapperProps<T> & { children?: any }) => {
    const sort = TableUtils.sortArray;
    const paginate = TableUtils.paginateCollection;
    const initialColumn = rowKeys[0];

    // Maintain source of truth
    const [records, setRecords] = React.useState<T[]>(dataRecords);

    const [sortColumn, setSortColumn] = React.useState<keyof T>(initialColumn);
    const [selectedSortDirection, setSortDirection] = React.useState<TableTypes.SortDirection>(TableTypes.SortDirection.ASC);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [currentPageOverride, setCurrentPageOverride] = React.useState<number>(0);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(rowSelectOptions[0].value);

    const [paginatedCollection, setPaginatedCollection] = React.useState<TableTypes.PaginatedCollection<T>>({});

    React.useEffect(() => { setRecords(dataRecords); }, [JSON.stringify(dataRecords)]);

    React.useEffect(() => {
        if (recordsLoaded) {
            setPaginatedCollection(paginate(sort(
                dataRecords,
                rowKeys[0],
                TableTypes.SortDirection.ASC,
            ), rowSelectOptions[0].value));
        }
    }, [recordsLoaded]);

    React.useEffect(() => {
        setPaginatedCollection(paginate(sort(records, sortColumn, selectedSortDirection), numberOfRows));
    }, [numberOfRows, selectedSortDirection, sortColumn]);

    const sortColumns = (operator) => { setSortColumn(operator); };

    const sortDirection = (direction) => { setSortDirection(direction); };

    const handleNumberOfRows = (rows) => {
        setCurrentPage(1);
        setCurrentPageOverride(1);
        setNumberOfRows(rows);
    };

    const handleCurrentPage = (page) => { setCurrentPage(page); };

    const clearOverride = () => { setCurrentPageOverride(0); };

    const concatKey = (record: T): string => rowKeys?.map((key) => `${record[key]}`).join('-')
        || (record && Object.values(record).map((val) => (`${val}`).toLowerCase().replace(' ', '')).join('-'))
        || 'unknown-keys';

    return (
        <>
            <TableComponents.Header
                columns={columns}
                initialSortColumn={`${initialColumn}`}
                initialSortDirection={selectedSortDirection}
                sortColumnCallback={sortColumns}
                sortDirectionCallback={sortDirection}
            />
            {
                recordsLoaded
                    ? paginatedCollection.hasOwnProperty(currentPage) && !!paginatedCollection[currentPage].length
                        ? paginatedCollection[currentPage].map((record: T & { tableIndex: string }) => (
                            <TableComponents.Row rowWrapper="div" key={`row-wrapper-${concatKey(record)}-${record.tableIndex}`}>
                                {children(record)}
                            </TableComponents.Row>
                        ))
                        : <ListSkeleton message="There are no records to show." noHeader noFooter />
                    : <ListSkeleton message="Loading Data" noHeader noFooter />
            }
            <TableComponents.Footer
                numberOfRecords={dataRecords.length}
                numberOfRowsDisplayedCallback={handleNumberOfRows}
                currentPageCallback={handleCurrentPage}
                currentPageOverride={currentPageOverride}
                clearCurrentPageOverride={clearOverride}
                rowSelectOptions={rowSelectOptions}
            />
        </>
    );
};
