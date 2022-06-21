import React from 'react';

import { Task, TaskType } from '../../../State/Tasks/Types';

import SubscribeToAlertSystem from './SubscribeToAlertSystem';
import TaskLink from './TaskLink';

interface Properties {
    task: Task;
}

const TaskSectionDetails: React.FC<Properties> = ({ task }) => {
    switch (task.type) {
        case TaskType.SubscribeToAlerts:
            return <SubscribeToAlertSystem task={task} />;
    }

    return <TaskLink task={task} />;
};

export default TaskSectionDetails;
