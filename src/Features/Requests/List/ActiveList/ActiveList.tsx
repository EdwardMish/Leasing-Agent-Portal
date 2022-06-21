import { RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { FilterOperation } from 'API/Shared/PagedSortedFilteredRequest';
import { CurrentUserState } from 'State';
import { defaultColumns } from 'Features/Requests/List/defaultColumns';
import { ListWrapper } from 'Features/Requests/List/ListWrapper';

export const ActiveList: React.FC<{ sharedStoreId?: string }> = ({ sharedStoreId }) => {
    const isTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    const filterOverrides = isTenant
        ? [
              {
                  columnNames: [RequestsTypes.ListColumns.isOpen],
                  value: 'true',
                  filterOperation: FilterOperation.EQUALS,
              },
          ]
        : [];

    return (
        <ListWrapper
            columns={defaultColumns}
            workflow={RequestsTypes.RequestWorkflows.Working}
            searchPlaceholder="Search Active Requests"
            filterOverrides={filterOverrides}
            noContentMessage="No requests found."
            rowWrapper="link"
            sharedStoreId={sharedStoreId}
        />
    );
};

