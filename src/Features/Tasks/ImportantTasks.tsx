import * as React from 'react';

import { Tasks } from '../../State';

import TaskSection from './TaskSection';

const ImportantTasks: React.FC = (): React.ReactElement => {
    const { areLoaded, importantTasks } = Tasks.Hooks.useTasksFromTasksState();

    return <>{areLoaded && importantTasks.length > 0 ? <TaskSection task={importantTasks[0]} /> : null}</>;
};

export default ImportantTasks;
