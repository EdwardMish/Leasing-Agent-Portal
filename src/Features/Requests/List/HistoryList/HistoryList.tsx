import { RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { defaultColumns } from 'Features/Requests/List/defaultColumns';
import { ListWrapper } from 'Features/Requests/List/ListWrapper';

export const HistoryList: React.FC<{ sharedStoreId?: string }> = ({ sharedStoreId }) => (
    <ListWrapper
        columns={defaultColumns}
        workflow={RequestsTypes.RequestWorkflows.History}
        searchPlaceholder="Search Request History"
        sharedStoreId={sharedStoreId}
    />
);

