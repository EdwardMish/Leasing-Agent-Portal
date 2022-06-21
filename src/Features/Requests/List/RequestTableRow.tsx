import * as React from 'react';
import { Components, Types } from '../../../Shared/Table';
import PrependWrapper from '../../../Shared/Table/PrependWrapper';
import { correctCamelCaseWord } from '../../../utils';
import { CellWrapper } from './CellWrapper';
import { RequestSummaryToggle } from './RequestSummaryToggle';

import styles = require('../../../Shared/Table/TableRow/table-row.module.css');
import { RequestsTypes } from 'API/Requests';

export interface RequestTableRowProps {
    columns: Types.TableColumn[];
    dataRecord: RequestsTypes.ListResponse;
    rowWrapper: 'div' | 'link';
    toggleSummary: (requestId: number) => void;
    showSummaryForId: number | null;
    isOO?: boolean;
}

// TODO: Move name maps into another area, i.e. Category, Subcategory, etc as well
const capitalizeStatus = (record, operator: string) =>
    operator === RequestsTypes.ListColumns.status || operator === RequestsTypes.ListColumns.priority
        ? correctCamelCaseWord(record[operator])
        : record[operator];

export const RequestTableRow: React.FC<RequestTableRowProps> = ({
    columns,
    dataRecord,
    rowWrapper,
    showSummaryForId,
    toggleSummary,
    isOO = false,
}) => (
    <Components.Row rowWrapper="div">
        {columns.map(({ display, operator, width, prependMobileRow = false, Component }) => (
            <CellWrapper
                key={`table-row-${dataRecord.requestId}-${operator}`}
                linkTarget={`/requests/details/${dataRecord.requestId}`}
                rowWrapper={rowWrapper}
                width={width}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {Component ? (
                    Component
                ) : prependMobileRow ? (
                    <PrependWrapper data={capitalizeStatus(dataRecord, operator)} display={display} />
                ) : (
                    <p className={styles.TableRowText}>{capitalizeStatus(dataRecord, operator)}</p>
                )}
            </CellWrapper>
        ))}
        {isOO && (
            <RequestSummaryToggle
                toggleSummary={toggleSummary}
                requestId={dataRecord.requestId}
                showSummaryForId={showSummaryForId}
            />
        )}
    </Components.Row>
);

