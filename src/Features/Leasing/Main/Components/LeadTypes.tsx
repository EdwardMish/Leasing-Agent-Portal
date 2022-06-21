import { LeasingLead } from 'API/Leasing/Types/LeasingLead';
import { Types } from 'Shared/Table';

export const nameColumn: Types.TableColumn = {
    display: 'Name',
    width: '20rem',
    operator: 'name',
    prependMobileRow: true,
};

export const createdColumn: Types.TableColumn = {
    display: 'Created',
    width: '20rem',
    operator: 'created',
    type: 'date',
    format: 'MM/dd/yyyy',
    prependMobileRow: true,
};

export const propertyNameColumn: Types.TableColumn = {
    display: 'Property',
    width: '20rem',
    operator: 'propertyName',
    prependMobileRow: true,
};

export const spaceColumn: Types.TableColumn = {
    display: 'Space',
    width: '20rem',
    operator: 'spaceName',
    prependMobileRow: true,
};

export const lastActivityColumn: Types.TableColumn = {
    display: 'Last Activity',
    width: '20rem',
    format: 'daysAgo',
    type: 'date',
    operator: 'lastActivity',
    prependMobileRow: true,
};

export const columns: Types.TableColumn[] = [nameColumn, createdColumn, propertyNameColumn, spaceColumn, lastActivityColumn];

export interface LeadTableRowProps {
    columns: Types.TableColumn[];
    dataRecord: LeasingLead;
    rowWrapper: 'div' | 'link';
}
export interface LeadsTableProps {
    leads: LeasingLead[];
    initialSortColumn: string;
    initialSortDirection: any;
    sortColumnCallback: any;
    sortDirectionCallback: any;
    numberOfRowsDisplayed: number;
    numberOfRowsDisplayedCallback: any;
    numberOfRecords: number;
    currentPageCallback: any;
    currentPage: number;
    noContentMessage: any;
    rowSelectOptions: any;
}

export const listRows: { value: number; display: number }[] = [
    { value: 10, display: 10 },
    { value: 25, display: 25 },
    { value: 50, display: 50 },
    { value: 75, display: 75 },
    { value: 100, display: 100 },
];

