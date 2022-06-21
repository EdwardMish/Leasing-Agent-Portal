import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { LoadingContent, NoContent } from 'Shared/PageElements';
import { Tasks } from 'State';

import styles = require('./tasks-panel.module.css');

export const TaskPanel: React.FC<{}> = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const { areLoaded, allTasks } = Tasks.Hooks.useTasksFromTasksState();

    const markTaskVisitedAndRedirectToLink = (task: Tasks.Types.Task) => {
        dispatch({
            type: Tasks.Actions.MARK_VISITED,
            payload: task.id,
        } as Tasks.ActionTypes);

        history.push(task.link);
    };

    return (
        <>
            {areLoaded ? (
                allTasks.length > 0 ? (
                    <div className={styles.Container}>
                        <ul className={`${styles.TasksList} ${styles.ScrollWrapper}`}>
                            {allTasks.map((_) => (
                                <li
                                    key={`task-${_.id}`}
                                    className={`${styles.Task} ${_.visited ? styles.Visited : ''}`}
                                    onClick={() => markTaskVisitedAndRedirectToLink(_)}
                                >
                                    <div className={`${styles.Title}`}>{_.title}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <NoContent message="All tasks completed. Way to go!" />
                )
            ) : (
                <LoadingContent />
            )}
        </>
    );
};
