import * as React from 'react';

import { Task } from '../../State/Tasks/Types';

import { Close, IconColors } from '../../Icons';

import { FlexWrapper } from '../../Shared/FlexWrapper';

import TaskSectionDetails from './Sections/TaskSectionDetails';
import DelayTask from './PauseTask';

const TaskSection: React.FC<{ task: Task }> = ({ task }): React.ReactElement => (
    <div
        style={{
            margin: '1rem',
            padding: '0.5rem 1rem 1rem',
            borderBottom: `1px solid ${IconColors.OffWhite}`,
        }}
    >
        <FlexWrapper align='stretch' justify='between'>
            <h2
                style={{
                    fontSize: '1.5rem',
                    lineHeight: '1.5rem',
                    margin: '0 0 1rem',
                }}
            >
                {task.title}
            </h2>
            <DelayTask task={task} Icon={Close} />
        </FlexWrapper>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', margin: '0 0 1rem' }}>{task.subtitle}</p>
        {<TaskSectionDetails task={task} />}
    </div>
);

export default TaskSection;
