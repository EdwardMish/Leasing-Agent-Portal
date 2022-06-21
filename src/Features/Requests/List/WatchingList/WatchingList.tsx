import * as React from 'react';
import { ListWrapper } from 'Features/Requests/List/ListWrapper';
import { defaultColumns } from 'Features/Requests/List/defaultColumns';
import { RequestsTypes } from 'API/Requests';

export const WatchingList: React.FC<{ sharedStoreId?: string }> = ({ sharedStoreId }) => (
    <ListWrapper
        columns={defaultColumns}
        workflow={RequestsTypes.RequestWorkflows.Watching}
        noContentMessage="You are currently not watching any Requests."
        sharedStoreId={sharedStoreId}
    />
);

