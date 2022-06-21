import { FilterColumn, FilterOperation } from '../API/Shared/PagedSortedFilteredRequest';

export const getSearchColumns = (term: string, columnNames: string[]): FilterColumn[] => (term
    ? term
        .split(' ')
        .flatMap((_) => _.split('~'))
        .map((token) => ({
            columnNames,
            value: token,
            filterOperation: FilterOperation.EQUALS,
        }))
    : []);
