import * as React from 'react'

import { Circle, CircleWithDot } from '../../../../Icons'

const styles = require('./watcher-row.module.css')

interface WatcherRowProps {
    email: string;
    id: number;
    isWatching: boolean;
    name: string;
    toggleWatcher: (userId: number) => void;
}

export const WatcherRow: React.FC<WatcherRowProps> = ({
    email,
    id,
    isWatching,
    name,
    toggleWatcher
}) => (<div
    key={`availabe-watchers-${id}`}
    onClick={() => toggleWatcher(id)}
    className={styles.WatcherRow}
>
    <div
        className={styles.WatchingIcon}
        style={{
            color: isWatching
                ? 'rgb(0, 113, 206)'
                : 'rgb(120, 120, 120)'
        }}
    >
        {isWatching ? <CircleWithDot /> : <Circle />}
    </div>
    <div className={styles.WatcherInfo}>
        <p>{name}</p>
        <p>{email}</p>
    </div>
</div>)