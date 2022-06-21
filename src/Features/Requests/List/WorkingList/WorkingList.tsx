import { RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { FilterOperation } from 'API/Shared/PagedSortedFilteredRequest';
import { CurrentUserState } from 'State';
import { ListWrapper } from 'Features/Requests/List/ListWrapper';
import { workingListColumns } from './workingListColumns';
import { WorkingListRow } from './WorkingListRow';

export const WorkingList: React.FC<{ sharedStoreId?: string }> = ({ sharedStoreId }) => {
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
            columns={workingListColumns}
            workflow={RequestsTypes.RequestWorkflows.Working}
            searchPlaceholder="Search Active Requests"
            filterOverrides={filterOverrides}
            noContentMessage="You are currently not working any Requests."
            rowWrapper="link"
            Row={WorkingListRow}
            sharedStoreId={sharedStoreId}
        />
    );
};

