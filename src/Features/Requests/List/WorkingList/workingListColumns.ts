import { Types } from '../../../../Shared/Table'
import { baseColumns, TableColumnNames } from '../defaultColumns'

export const workingListColumns: Types.TableColumn[] = [
    baseColumns(TableColumnNames.idColumn),
    baseColumns(TableColumnNames.nameColumn),
    baseColumns(TableColumnNames.daysOpenColumn),
    baseColumns(TableColumnNames.statusColumn),
    baseColumns(TableColumnNames.priorityColumn),
    {
        display: 'Currently Assigned',
        width: '10rem',
        operator: 'custom',
        prependMobileRow: true,
    }
]