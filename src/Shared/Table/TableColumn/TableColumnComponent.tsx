import * as React from 'react';

const styles = require('../TableRow/table-row.module.css');

interface TableColumnProps {
    width: string;
    flex?: number;
    style?: React.CSSProperties;
}

export const TableColumnComponent: React.FC<TableColumnProps> = ({
    children,
    width,
    flex,
    style = {},
}) => (
    <div
        className={styles.TableRowTextWrapper}
        style={
            flex
                ? {
                    ...style,
                    flex,
                    width,
                }
                : {
                    ...style,
                    width,
                }
        }
    >
        {children}
    </div>
);
