import { Types as TableTypes } from '../../Shared/Table';

interface SortColumn {
    columnName: string;
    sortDirection: TableTypes.SortDirection;
}

enum FilterOperation {
    EQUALS = 'eq',
    NOT_EQUALS = 'ne',
    LESS_THAN = 'lt',
    LESS_THAN_EQUAL_TO = 'lte',
    GREATER_THAN = 'gt',
    GREATER_THAN_EQUAL_TO = 'gte',
}

interface FilterColumn {
    columnNames: string[];
    value: string | number;
    filterOperation: FilterOperation;
}

class PagedSortedFilteredRequestParams {
    readonly pageNumber: number;

    readonly pageSize: number;

    readonly sort: string;

    readonly filter: string[];

    constructor(sort: SortColumn[], filters: FilterColumn[], pageSize: number, pageNumber: number) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;

        if (filters && filters.length > 0) {
            this.filter = [];

            filters.forEach((f: FilterColumn) => {
                const filter = f.columnNames.map((c) => `${c}~${f.value}~${f.filterOperation}`).join('|');

                this.filter?.push(filter);
            });
        }

        this.sort = sort.map((_) => `${_.columnName}~${_.sortDirection}`).join(',');
    }
}

export { SortColumn, FilterColumn, FilterOperation, PagedSortedFilteredRequestParams };
