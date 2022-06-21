import { RequestsTypes } from 'API/Requests';
import { Types } from '../../../Shared/Table';

export enum TableColumnNames {
    idColumn = 'idColumn',
    nameColumn = 'nameColumn',
    daysOpenColumn = 'daysOpenColumn',
    statusColumn = 'statusColumn',
    priorityColumn = 'priorityColumn',
}

const daysOpenColumn = {
    display: 'Days Open',
    width: '6rem',
    operator: RequestsTypes.ListColumns.daysOpen,
    prependMobileRow: true,
};

const idColumn: Types.TableColumn = {
    display: 'Id',
    width: '2.5rem',
    operator: RequestsTypes.ListColumns.requestId,
    prependMobileRow: true,
};

const nameColumn: Types.TableColumn = {
    display: 'Name',
    width: '20rem',
    operator: RequestsTypes.ListColumns.name,
    prependMobileRow: true,
};

const statusColumn: Types.TableColumn = {
    display: 'Status',
    width: '6rem',
    operator: RequestsTypes.ListColumns.status,
    prependMobileRow: true,
};

const priorityColumn: Types.TableColumn = {
    display: 'Priority',
    width: '6rem',
    operator: RequestsTypes.ListColumns.priority,
    prependMobileRow: true,
};

interface ColumnOverride {
    columnWidth?: string;
}

export const baseColumns = (
    name: TableColumnNames,
    override: ColumnOverride & { [override: string]: string | number | boolean } = {},
): Types.TableColumn =>
    ({
        [TableColumnNames.daysOpenColumn]: {
            ...daysOpenColumn,
            ...override,
            width: override?.columnWidth ? override.columnWidth : daysOpenColumn.width,
        },
        [TableColumnNames.idColumn]: {
            ...idColumn,
            ...override,
            width: override?.columnWidth ? override.columnWidth : idColumn.width,
        },
        [TableColumnNames.nameColumn]: {
            ...nameColumn,
            ...override,
            width: override?.columnWidth ? override.columnWidth : nameColumn.width,
        },
        [TableColumnNames.statusColumn]: {
            ...statusColumn,
            ...override,
            width: override?.columnWidth ? override.columnWidth : statusColumn.width,
        },
        [TableColumnNames.priorityColumn]: {
            ...priorityColumn,
            ...override,
            width: override?.columnWidth ? override.columnWidth : priorityColumn.width,
        },
    }[name]);

export const defaultColumns: Types.TableColumn[] = [idColumn, nameColumn, daysOpenColumn, statusColumn, priorityColumn];
