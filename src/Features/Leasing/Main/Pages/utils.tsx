import { FilterColumn } from 'API/Shared/PagedSortedFilteredRequest';
import { getSearchColumns } from 'utils/getSearchColumns';

export const searchColumns = (term: string): FilterColumn[] => getSearchColumns(term, ['name', 'propertyName', 'spaceName']); // ['name', 'created', 'lastActivity', 'propertyName']
export const cleanTerm = (term: string): string => term.toLowerCase().replace(' ', '');

