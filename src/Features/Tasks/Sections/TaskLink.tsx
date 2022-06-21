import * as React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../../../State/Tasks/Types';

interface Properties {
    task: Task;
}

const TaskLink: React.FC<Properties> = ({ task }): React.ReactElement => (
    <div style={{ marginTop: '.75rem' }}>
        <p>
            <Link style={{ color: 'var(--color-BrandBlue)' }} to={task.link}>
                {task.linkDisplay}
            </Link>
        </p>
    </div>
);

export default TaskLink;
