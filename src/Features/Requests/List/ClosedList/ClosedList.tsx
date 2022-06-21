import { RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { FilterOperation } from 'API/Shared/PagedSortedFilteredRequest';
import { defaultColumns } from 'Features/Requests/List/defaultColumns';
import { ListWrapper } from 'Features/Requests/List/ListWrapper';

export const ClosedList: React.FC<{ sharedStoreId?: string }> = ({ sharedStoreId }) => (
    <ListWrapper
        columns={defaultColumns}
        workflow={RequestsTypes.RequestWorkflows.All}
        searchPlaceholder="Search Closed Requests"
        sharedStoreId={sharedStoreId}
        filterOverrides={[
            {
                columnNames: [RequestsTypes.ListColumns.isOpen],
                value: 'false',
                filterOperation: FilterOperation.EQUALS,
            },
        ]}
    />
);

