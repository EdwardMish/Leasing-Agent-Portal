import { Types } from '../../../../Shared/Table'
import { baseColumns, TableColumnNames } from '../defaultColumns'

export const toDoListColumns: Types.TableColumn[] = [
    baseColumns(TableColumnNames.idColumn, { linkColumn: true }),
    baseColumns(TableColumnNames.nameColumn, { linkColumn: true }),
    baseColumns(TableColumnNames.daysOpenColumn, { linkColumn: true }),
    baseColumns(TableColumnNames.priorityColumn),
    {
        display: '',
        width: '12rem',
        operator: 'custom'
    }
]