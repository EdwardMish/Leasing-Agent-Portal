import * as React from 'react';

import { SortDirection, TableColumn } from '../Types';
import { ChevronDown, ChevronUp } from '../../../Icons';

const styles = require('./table-header.module.css');

interface TableHeaderProps {
    columns: TableColumn[];
    initialSortColumn: string;
    initialSortDirection: SortDirection;
    sortColumnCallback: (columnOperator: string) => void;
    sortDirectionCallback: (sortDirection: SortDirection) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
    columns,
    initialSortColumn,
    initialSortDirection,
    sortColumnCallback,
    sortDirectionCallback,
}) => {
    const [sortColumn, setSortColumn] = React.useState<string>(initialSortColumn);
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(initialSortDirection);

    React.useEffect(() => {
        sortColumnCallback(sortColumn);
    }, [sortColumn]);

    React.useEffect(() => {
        sortDirectionCallback(sortDirection);
    }, [sortDirection]);

    const toggleSortDirection = () => {
        sortDirection === SortDirection.ASC
            ? setSortDirection(SortDirection.DESC)
            : setSortDirection(SortDirection.ASC);
    };

    const handleSort = (operator: any) => {
        sortColumn === operator
            ? toggleSortDirection()
            : setSortColumn(operator);
    };

    return (
        <div className={styles.TableHeader}>
            {
                columns.map(({
                    display, operator, width, flex,
                }) => (
                    <div
                        className={styles.ColumnHeader}
                        // Allow non-sortable columns by passing 'custom' operator
                        onClick={() => { if (!operator.includes('custom')) handleSort(operator); }}
                        key={`table-header-${operator}`}
                        style={flex
                            ? { width, flex }
                            : { width }}
                    >
                        <p className={styles.TableHeaderText}>{display}</p>
                        {
                            sortColumn === operator
                                ? sortDirection === SortDirection.ASC
                                    ? <ChevronUp />
                                    : <ChevronDown />
                                : null
                        }
                    </div>
                ))
            }
        </div>
    );
};
