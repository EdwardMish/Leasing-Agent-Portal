import getPagedLeasingLeads from 'API/Leasing/API/getLeasingLeads';
import { LeasingLead, LeasingLeadStatus } from 'API/Leasing/Types/LeasingLead';
import { FilterColumn, FilterOperation, PagedSortedFilteredRequestParams } from 'API/Shared/PagedSortedFilteredRequest';
import LeadsTable from 'Features/Leasing/Main/Components/LeadsTable';
import { listRows } from 'Features/Leasing/Main/Components/LeadTypes';
import { searchColumns } from 'Features/Leasing/Main/Pages/utils';
import { MagnifyingGlass } from 'Icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LoadingContent } from 'Shared/PageElements';
import { Search } from 'Shared/Search';
import { Types as TableTypes } from 'Shared/Table';
import { addErrorMessage } from 'State/GlobalMessages/actionCreators';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';
import styles from './leasinglead.module.css';

export interface LeadsProps {
    status?: LeasingLeadStatus;
    filterOverrides?: FilterColumn[];
    searchPlaceholder?: string;
}

const LeasingLeads: React.FC<LeadsProps> = ({
    status = LeasingLeadStatus.ACTIVE,
    filterOverrides = [],
    searchPlaceholder = 'Search Leads (Name, Property, Space)',
}): React.ReactElement => {
    const [leads, setLeads] = React.useState<LeasingLead[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const dispatch = useDispatch();

    const filterStatus = {
        columnNames: ['status'],
        value: status,
        filterOperation: FilterOperation.EQUALS,
    };

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [currentColumnOperator, setCurrentColumnOperator] = React.useState<string>('created');
    const [currentSortDirection, setCurrentSortDirection] = React.useState<TableTypes.SortDirection>(
        TableTypes.SortDirection.ASC,
    );
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const [currentRowCount, setCurrentRowCount] = React.useState<number>(listRows[0].value);

    // On loading, request data:
    const getList = React.useCallback(
        async (newSearchTerm = '', clearSearch: boolean = false): Promise<void> => {
            const term = clearSearch ? newSearchTerm : newSearchTerm || searchTerm;
            const searchableColumns = [...searchColumns(term), ...[...filterOverrides, filterStatus]];
            const params = new PagedSortedFilteredRequestParams(
                [
                    {
                        columnName: currentColumnOperator,
                        sortDirection: currentSortDirection,
                    },
                ],
                searchableColumns,
                currentRowCount,
                currentPage,
            );

            try {
                const leadResults: PagedResponse<LeasingLead> = await getPagedLeasingLeads(params);

                if (leadResults) {
                    setLeads(leadResults.results);
                    setTotalCount(leadResults.totalCount);
                }
            } catch (Error) {
                dispatch(addErrorMessage('There was an issue with the connection, please try again'));
            }

            setLoading(false);
        },
        [currentPage, currentRowCount, currentSortDirection, status],
    );

    React.useEffect(() => {
        setCurrentPage(1);
    }, [status]);

    React.useEffect(() => {
        setLoading(true);
        getList();
    }, [getList, currentColumnOperator, currentSortDirection, currentRowCount, currentPage]);

    const submitSearch = async () => {
        await getList(searchTerm, searchTerm === '');
    };

    const handleSearch = (term: string): void => {
        setSearchTerm(term);
    };
    const handleKeyboardSearch = async (term: string) => {
        setSearchTerm(term);
        await getList(term, term === '');
    };
    const clearSearch = async () => {
        setSearchTerm('');
        await getList('', true);
    };
    const handleColumnChange = (columnOperator: string) => {
        setCurrentColumnOperator(columnOperator);
    };
    const handleSortDirectionChange = (sortDirection: TableTypes.SortDirection) => {
        setCurrentSortDirection(sortDirection);
    };
    const handleRowsDisplayed = (rowsDisplayed: number) => {
        setCurrentRowCount(rowsDisplayed);
    };
    const handlePageChange = (newPageIndex: number): void => {
        setCurrentPage(newPageIndex);
    };
    return (
        <>
            <div className={styles.SearchBar} style={{ marginTop: '1rem' }}>
                <Search
                    handler={handleSearch}
                    clearCallback={clearSearch}
                    placeholder={searchPlaceholder}
                    keyboardHandler={handleKeyboardSearch}
                />
                <div className={styles.SearchIcon} onClick={submitSearch}>
                    <MagnifyingGlass />
                </div>
            </div>
            {loading ? (
                <LoadingContent />
            ) : (
                <LeadsTable
                    leads={leads}
                    // Header:
                    initialSortColumn={currentColumnOperator}
                    initialSortDirection={currentSortDirection}
                    sortColumnCallback={handleColumnChange}
                    sortDirectionCallback={handleSortDirectionChange}
                    // Footer:
                    numberOfRecords={totalCount}
                    numberOfRowsDisplayed={currentRowCount}
                    numberOfRowsDisplayedCallback={handleRowsDisplayed}
                    currentPageCallback={handlePageChange}
                    currentPage={currentPage}
                    rowSelectOptions={listRows}
                    noContentMessage="There are no leads to show."
                />
            )}
        </>
    );
};
export default LeasingLeads;

