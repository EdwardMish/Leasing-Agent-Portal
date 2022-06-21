import * as React from 'react';
import { IconProps } from '../../Icons/IconProps';
import useTasksFromTasksState from '../../State/Tasks/Hooks/useTasksFromTasksState';
import { Task } from '../../State/Tasks/Types';

interface Properties {
    task: Task;
    text?: string;
    Icon?: React.FC<IconProps>;
}

const PauseTask: React.FC<Properties> = ({ task, text = 'Remind Me Later', Icon }): React.ReactElement => {
    const { pauseTask } = useTasksFromTasksState();

    return (
        <div>
            <a onClick={() => pauseTask(task)}>{!!Icon ? <Icon aspect='1rem' /> : text}</a>
        </div>
    );
};

export default PauseTask;
