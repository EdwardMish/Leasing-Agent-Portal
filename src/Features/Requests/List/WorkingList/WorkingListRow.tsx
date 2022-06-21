import { RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { Components } from '../../../../Shared/Table';
import PrependWrapper from '../../../../Shared/Table/PrependWrapper';
import { correctCamelCaseWord } from '../../../../utils';
import { CellWrapper } from '../CellWrapper';
import { RequestSummaryToggle } from '../RequestSummaryToggle';
import { RequestTableRowProps } from '../RequestTableRow';
import { workingListColumns } from './workingListColumns';

type WorkingListRowProps = RequestTableRowProps;

const idColumn = workingListColumns[0];
const daysOpenColumn = workingListColumns[1];
const nameColumn = workingListColumns[2];
const statusColumn = workingListColumns[3];
const priorityColumn = workingListColumns[4];

// TODO: Move name maps into another area, i.e. Category, Subcategory, etc as well
const capitalizeStatus = (record, operator: string) =>
    operator === RequestsTypes.ListColumns.status || operator === RequestsTypes.ListColumns.priority
        ? correctCamelCaseWord(record[operator])
        : record[operator];

export const WorkingListRow: React.FC<WorkingListRowProps> = ({
    dataRecord,
    rowWrapper,
    toggleSummary,
    showSummaryForId,
}) => {
    const { assignedTo, requestId } = dataRecord;

    return (
        <Components.Row rowWrapper="div">
            <CellWrapper
                key={`table-row-${dataRecord.requestId}-${idColumn.operator}`}
                linkTarget={`/requests/details/${dataRecord.requestId}`}
                rowWrapper={rowWrapper}
                width={idColumn.width}
            >
                <PrependWrapper data={capitalizeStatus(dataRecord, idColumn.operator)} display={idColumn.display} />
            </CellWrapper>
            <CellWrapper
                linkTarget={`/requests/details/${dataRecord.requestId}`}
                rowWrapper={rowWrapper}
                key={`table-row-${dataRecord.requestId}-${daysOpenColumn.operator}`}
                width={daysOpenColumn.width}
            >
                <PrependWrapper
                    data={capitalizeStatus(dataRecord, daysOpenColumn.operator)}
                    display={daysOpenColumn.display}
                />
            </CellWrapper>
            <CellWrapper
                linkTarget={`/requests/details/${dataRecord.requestId}`}
                rowWrapper={rowWrapper}
                key={`table-row-${dataRecord.requestId}-${nameColumn.operator}`}
                width={nameColumn.width}
            >
                <PrependWrapper data={capitalizeStatus(dataRecord, nameColumn.operator)} display={nameColumn.display} />
            </CellWrapper>
            <CellWrapper
                linkTarget={`/requests/details/${dataRecord.requestId}`}
                rowWrapper={rowWrapper}
                key={`table-row-${dataRecord.requestId}-${statusColumn.operator}`}
                width={statusColumn.width}
            >
                <PrependWrapper data={capitalizeStatus(dataRecord, statusColumn.operator)} display={statusColumn.display} />
            </CellWrapper>
            <CellWrapper
                linkTarget={`/requests/details/${dataRecord.requestId}`}
                rowWrapper={rowWrapper}
                key={`table-row-${dataRecord.requestId}-${priorityColumn.operator}`}
                width={priorityColumn.width}
            >
                <PrependWrapper
                    data={capitalizeStatus(dataRecord, priorityColumn.operator)}
                    display={priorityColumn.display}
                />
            </CellWrapper>
            <CellWrapper
                linkTarget={`/requests/details/${dataRecord.requestId}`}
                rowWrapper={rowWrapper}
                key={`table-row-${dataRecord.requestId}-${workingListColumns[5].operator}`}
                width={workingListColumns[5].width}
            >
                <PrependWrapper data={assignedTo?.name || 'Unknown User'} display={workingListColumns[5].display} />
            </CellWrapper>
            <RequestSummaryToggle toggleSummary={toggleSummary} requestId={requestId} showSummaryForId={showSummaryForId} />
        </Components.Row>
    );
};

