import { RequestsAPI, RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { ScrollWrapper } from '../../../../Shared/ScrollWrapper';
import { WatcherRow } from '../WatcherRow';

interface ActiveWatchersProps {
    currentWatchers: RequestsTypes.WatcherResponse[];
    requestId: number;
    watcherCallback: () => void;
}

export const ActiveWatchers: React.FC<ActiveWatchersProps> = ({ currentWatchers, requestId, watcherCallback }) => {
    const removeWatcher = (id: number) => {
        RequestsAPI.removeWatcher(requestId, id).then(() => {
            watcherCallback();
        });
    };

    return (
        <ScrollWrapper maxHeight="20rem">
            {currentWatchers.map(({ id, email, name }) => (
                <WatcherRow
                    key={`active-watchers-${id}`}
                    id={id}
                    isWatching
                    email={email}
                    name={name}
                    toggleWatcher={removeWatcher}
                />
            ))}
        </ScrollWrapper>
    );
};

