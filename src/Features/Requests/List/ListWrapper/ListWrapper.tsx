import { RequestsAPI, RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectSearchTerm,
    storeSearchTermAction,
    selectSortDirection,
    storeSortedColumnAction,
    storeSortDirectionAction,
    selectSortedColumn,
} from 'State/ListWrapper';
import { FilterColumn, PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import { MagnifyingGlass } from 'Icons';
import { NoContent } from 'Shared/PageElements';
import { Search } from 'Shared/Search';
import { Components as TableComponents, Types as TableTypes } from 'Shared/Table';
import { CurrentUserState } from 'State';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';
import { getSearchColumns } from 'utils';
import RequestSummary from 'Features/Requests/List/RequestSummary';
import { RequestTableRow, RequestTableRowProps } from 'Features/Requests/List/RequestTableRow';
import { ListSkeleton } from 'Features/Requests/List/Skeletons';

const styles = require('../request-list.module.css');

interface ListWrapperProps {
    workflow: RequestsTypes.RequestWorkflows;
    columns: TableTypes.TableColumn[];
    searchPlaceholder?: string;
    filterOverrides?: FilterColumn[];
    noContentMessage?: string;
    rowWrapper?: 'div' | 'link';
    Row?: React.FC<RequestTableRowProps>;
    sharedStoreId?: string;
}

const searchColumns = (term: string): FilterColumn[] =>
    getSearchColumns(term, [
        RequestsTypes.ListColumns.category,
        RequestsTypes.ListColumns.daysOpen,
        RequestsTypes.ListColumns.name,
        RequestsTypes.ListColumns.occupantName,
        RequestsTypes.ListColumns.priority,
        RequestsTypes.ListColumns.propertyName,
        RequestsTypes.ListColumns.requestId,
        RequestsTypes.ListColumns.space,
        RequestsTypes.ListColumns.status,
    ]);

const listRows: { value: number; display: number }[] = [
    { value: 10, display: 10 },
    { value: 25, display: 25 },
    { value: 50, display: 50 },
    { value: 75, display: 75 },
    { value: 100, display: 100 },
];

export const ListWrapper: React.FC<ListWrapperProps> = ({
    columns,
    workflow,
    searchPlaceholder = 'Search Requests',
    filterOverrides = [],
    noContentMessage = 'There are no requests to show.',
    rowWrapper = 'link',
    Row = RequestTableRow,
    sharedStoreId = searchPlaceholder,
}) => {
    const isTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    const [requests, setRequests] = React.useState<RequestsTypes.ListResponse[]>([]);
    const [requestsLoaded, setRequestsLoaded] = React.useState<boolean>(false);
    const [totalCount, setTotalCount] = React.useState<number>(0);

    const [currentRowCount, setCurrentRowCount] = React.useState<number>(listRows[0].value);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [currentPageOverride, setCurrentPageOverride] = React.useState<number>(0);

    const [showSummaryForId, setShowSummary] = React.useState<number | null>(null);

    const dispatch = useDispatch();

    // saved search params in redux

    const storedSearchTerm = useSelector(selectSearchTerm(sharedStoreId));
    const storedSortedColumn = useSelector(selectSortedColumn(sharedStoreId));
    const storedSortDirection = useSelector(selectSortDirection(sharedStoreId));

    const getList = (newSearchTerm: string = ''): Promise<void> => {
        const params = new PagedSortedFilteredRequestParams(
            [
                {
                    columnName: storedSortedColumn,
                    sortDirection: storedSortDirection,
                },
            ],
            [...searchColumns(newSearchTerm || storedSearchTerm), ...filterOverrides],
            currentRowCount,
            currentPage,
        );

        const pagedResponsePromise: (
            params: PagedSortedFilteredRequestParams,
        ) => Promise<PagedResponse<RequestsTypes.ListResponse>> = isTenant
            ? RequestsAPI.getTenantRequests
            : RequestsAPI.getRequestsForWorkflow[workflow];

        return pagedResponsePromise(params)
            .then((requestResponse: PagedResponse<RequestsTypes.ListResponse>) => {
                setRequests(requestResponse.results);
                setTotalCount(requestResponse.totalCount);
                setCurrentPage(currentPage);

                setRequestsLoaded(true);
            })
            .catch(() => {
                setRequestsLoaded(true);
            });
    };

    // Initial Effect:
    React.useEffect(() => {
        getList(storedSearchTerm);
    }, []);

    React.useEffect(() => {
        if (requestsLoaded) {
            setRequestsLoaded(false);
            getList(storedSearchTerm);
        }
    }, [storedSearchTerm, storedSortedColumn, storedSortDirection, currentRowCount, currentPage]);

    const submitSearch = () => {
        getList();
    };

    const handleSearch = (term: string) => {};

    const handleKeyboardSearch = (term: string) => {
        dispatch(storeSearchTermAction(sharedStoreId, term));
    };

    const clearSearch = () => {
        dispatch(storeSearchTermAction(sharedStoreId, ''));
    };

    const handleColumnChange = (columnOperator: string) => {
        dispatch(storeSortedColumnAction(sharedStoreId, columnOperator));
    };

    const handleSortDirectionChange = (sortDirection: TableTypes.SortDirection) => {
        dispatch(storeSortDirectionAction(sharedStoreId, sortDirection));
    };

    const handleRowsDisplayed = (rowsDisplayed: number) => {
        setCurrentPageOverride(1);
        setCurrentPage(1);
        setCurrentRowCount(rowsDisplayed);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);

        if (currentPageOverride > 0) {
            setCurrentPageOverride(0);
        }
    };

    const toggleSummary = (requestId: number) => {
        if (requestId === showSummaryForId) {
            setShowSummary(null);
        } else {
            setShowSummary(requestId);
        }
    };

    return (
        <>
            <div className={styles.SearchBar}>
                <Search
                    clearCallback={clearSearch}
                    handler={handleSearch}
                    placeholder={searchPlaceholder}
                    keyboardHandler={handleKeyboardSearch}
                    initialValue={storedSearchTerm}
                />
                <div className={styles.SearchIcon} onClick={submitSearch}>
                    <MagnifyingGlass />
                </div>
            </div>
            <TableComponents.Header
                columns={
                    isTenant
                        ? columns
                        : [
                              ...columns,
                              {
                                  display: '',
                                  width: '2rem',
                                  operator: 'custom-summary-toggle',
                              },
                          ]
                }
                initialSortColumn={storedSortedColumn}
                initialSortDirection={storedSortDirection}
                sortColumnCallback={handleColumnChange}
                sortDirectionCallback={handleSortDirectionChange}
            />
            {requestsLoaded ? (
                !!requests.length ? (
                    requests.map((request: RequestsTypes.ListResponse) => (
                        <div key={`request-row-${request.requestId}`}>
                            <Row
                                columns={columns}
                                dataRecord={request}
                                rowWrapper={rowWrapper}
                                showSummaryForId={showSummaryForId}
                                toggleSummary={toggleSummary}
                                isOO={!isTenant}
                            />
                            {!isTenant && showSummaryForId && showSummaryForId === request.requestId && (
                                <RequestSummary requestId={request.requestId} />
                            )}
                        </div>
                    ))
                ) : (
                    <NoContent message={noContentMessage} />
                )
            ) : (
                <ListSkeleton message="Loading Requests" noHeader noFooter />
            )}
            <TableComponents.Footer
                numberOfRecords={totalCount}
                numberOfRowsDisplayedCallback={handleRowsDisplayed}
                currentPageCallback={handlePageChange}
                currentPageOverride={currentPageOverride}
                clearCurrentPageOverride={() => {
                    setCurrentPageOverride(0);
                }}
                rowSelectOptions={listRows}
            />
        </>
    );
};

