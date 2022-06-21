import LeadTableRow from 'Features/Leasing/Main/Components/LeadTableRow';
import { columns, LeadsTableProps, listRows } from 'Features/Leasing/Main/Components/LeadTypes';
import TableFooter from 'Features/Leasing/Main/Components/TableFooter';
import React from 'react';
import { NoContent } from '../../../../Shared/PageElements';
import { Components as TableComponents } from '../../../../Shared/Table';

const LeadsTable: React.FC<LeadsTableProps> = ({
    leads,
    initialSortColumn,
    initialSortDirection,
    sortColumnCallback,
    sortDirectionCallback,
    numberOfRowsDisplayedCallback,
    numberOfRowsDisplayed,
    numberOfRecords,
    currentPageCallback,
    currentPage,
    noContentMessage = 'There are no rows to show.',
}) => (
    <>
        <TableComponents.Header
            columns={columns}
            initialSortColumn={initialSortColumn}
            initialSortDirection={initialSortDirection}
            sortColumnCallback={sortColumnCallback}
            sortDirectionCallback={sortDirectionCallback}
        />
        {leads && !!leads.length ? (
            leads.map((lead) => <LeadTableRow columns={columns} dataRecord={lead} rowWrapper="link" key={lead.id} />)
        ) : (
            <NoContent message={noContentMessage} />
        )}

        <TableFooter
            numberOfRecords={numberOfRecords}
            numberOfRowsDisplayed={numberOfRowsDisplayed}
            numberOfRowsDisplayedCallback={numberOfRowsDisplayedCallback}
            currentPageCallback={currentPageCallback}
            currentPage={currentPage}
            rowSelectOptions={listRows}
        />
    </>
);
export default LeadsTable;

