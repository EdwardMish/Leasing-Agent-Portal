import * as React from 'react';
import { ToDoListRow } from './ToDoListRow';
import { toDoListColumns } from './toDoListColumns';
import { ListWrapper } from 'Features/Requests/List/ListWrapper';
import { RequestsTypes } from 'API/Requests';

export const ToDoList: React.FC<{ sharedStoreId?: string }> = ({ sharedStoreId }) => {
    return (
        <ListWrapper
            columns={toDoListColumns}
            workflow={RequestsTypes.RequestWorkflows.New}
            noContentMessage="You do not have any new Requests."
            rowWrapper="link"
            Row={ToDoListRow}
            sharedStoreId={sharedStoreId}
        />
    );
};

