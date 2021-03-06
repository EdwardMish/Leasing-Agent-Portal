import { Types } from '../../../Shared/Table';

enum ColumnNames {
    propertyName = 'propertyName',
    createdDate = 'createdDate',
    id = 'id',
    propertyId = 'propertyId',
    completedDate = 'completedDate',
    interactions = 'interactionCount',
    items = 'followUpCount',
}

const propertyColumn: Types.TableColumn = {
    display: 'Property',
    width: '12rem',
    operator: ColumnNames.propertyName,
    prependMobileRow: true,
};

const createdDateColumn: Types.TableColumn = {
    display: 'Created',
    width: '12rem',
    operator: ColumnNames.createdDate,
    prependMobileRow: true,
};

const interactionsColumn: Types.TableColumn = {
    display: 'Interactions',
    width: '4rem',
    operator: ColumnNames.interactions,
    prependMobileRow: true,
};

const followUpColumn: Types.TableColumn = {
    display: 'Followup',
    width: '4rem',
    operator: ColumnNames.items,
    prependMobileRow: true,
};

const columns: Types.TableColumn[] = [
    propertyColumn,
    createdDateColumn,
    interactionsColumn,
    followUpColumn,
];

const columnDisplay = {
    [ColumnNames.propertyName]: (propertyName: string): string => propertyName,
    [ColumnNames.createdDate]: (createdDate: string): string => createdDate,
    [ColumnNames.interactions]: (interactionCount: number): number => interactionCount,
    [ColumnNames.items]: (followUpCount: number): number => followUpCount,
};

export {
    columns,
    columnDisplay,
    ColumnNames,
};
