/*
 * A utility to maintain a consistent display for a 'Meter' column
 * Meter # is a data point used in multiple areas
 *
 */

import { Types as TableTypes } from '../../../Shared/Table';

export const meterColumn = (operator: string, display: string = 'Meter #'): TableTypes.TableColumn => ({
    display,
    width: '7rem',
    operator,
});
