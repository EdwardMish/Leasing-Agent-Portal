import { format, formatDistance } from 'date-fns';
import { LeadTableRowProps } from 'Features/Leasing/Main/Components/LeadTypes';
import { CellWrapper } from 'Features/Requests/List/CellWrapper';
import React from 'react';
import { Components } from 'Shared/Table';

const LeadTableRow: React.FC<LeadTableRowProps> = ({ columns, dataRecord, rowWrapper }) => (
    <Components.Row rowWrapper="div">
        {columns.map((column) => {
            const { operator, width } = column;

            let cellValue = dataRecord[operator];
            if (column.type === 'date' && column.format) {
                cellValue =
                    column.format === 'daysAgo'
                        ? formatDistance(new Date(cellValue), new Date(), { addSuffix: true })
                        : format(new Date(cellValue), column.format);
            }
            return (
                <CellWrapper
                    key={`leads-table-row-${dataRecord.id}-${operator}`}
                    rowWrapper={rowWrapper}
                    width={width}
                    style={{ display: 'flex', alignItems: 'center' }}
                    linkTarget={`/leasing/leads/${dataRecord.id}`}
                >
                    <p style={{ color: 'black' }}>{cellValue}</p>
                </CellWrapper>
            );
        })}
    </Components.Row>
);
export default LeadTableRow;

