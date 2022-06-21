import { Task } from 'Features/Leasing/Main/Types/Task';
import { TaskType } from 'Features/Leasing/Main/Types/TaskType';
import { ChevronRight } from 'Icons';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { IconWithText, NoContent, ValueText } from 'Shared/PageElements';
import { isMobile } from 'utils/display';
import styles from './detailsContent.module.css';

interface TasksListProps {
    tasks: Task[];
    summaryUrl: string;
}

const CompletedTasksList: React.FC<TasksListProps> = ({ tasks, summaryUrl }: TasksListProps) => {
    const history = useHistory();
    const mobile = isMobile();

    const viewDetails = (endpoint: string) => {
        history.push(`${summaryUrl}/${endpoint}`);
    };
    return (
        <>
            {tasks && tasks.length > 0 ? (
                <>
                    {tasks.filter((task) => task.type === TaskType.Asset).length > 0 &&
                        tasks.filter((task) => task.type === TaskType.Asset).every((asset) => asset.isComplete) && (
                            <div className={styles.TasksListItem}>
                                <FlexWrapper justify="between" align="center">
                                    <ValueText valueText={'Assets'} />
                                    <div className={styles.Action} onClick={() => viewDetails('assets')}>
                                        <IconWithText
                                            text={mobile ? '' : 'View Asset Details'}
                                            Icon={ChevronRight}
                                            iconAspect={'1.8rem'}
                                        />
                                    </div>
                                </FlexWrapper>
                            </div>
                        )}

                    {tasks.filter((task) => task.type === TaskType.Liability).length > 0 &&
                        tasks
                            .filter((task) => task.type === TaskType.Liability)
                            .every((liability) => liability.isComplete) && (
                            <div className={styles.TasksListItem}>
                                <FlexWrapper justify="between" align="center">
                                    <ValueText valueText={'Liabilities'} />
                                    <div className={styles.Action} onClick={() => viewDetails('liabilities')}>
                                        <IconWithText
                                            text={mobile ? '' : 'View Liability Details'}
                                            Icon={ChevronRight}
                                            iconAspect={'1.8rem'}
                                        />
                                    </div>
                                </FlexWrapper>
                            </div>
                        )}

                    {tasks
                        .filter((task) => task.type === TaskType.Question)
                        .map((question) => (
                            <div className={styles.TasksListItem} key={question.name}>
                                <FlexWrapper justify="between" align="center">
                                    <div>
                                        <ValueText valueText={'Questions'} />
                                        <p className={styles.HelpText}>{question.name}</p>
                                    </div>
                                    <div className={styles.Action} onClick={() => viewDetails('other')}>
                                        <IconWithText
                                            text={mobile ? '' : 'View Custom Details'}
                                            Icon={ChevronRight}
                                            iconAspect={'1.8rem'}
                                        />
                                    </div>
                                </FlexWrapper>
                            </div>
                        ))}
                    {tasks
                        .filter((task) => task.type === TaskType.Document)
                        .map((document) => (
                            <div className={styles.TasksListItem} key={document.name}>
                                <FlexWrapper justify="between" align="center">
                                    <div>
                                        <ValueText valueText={'Documents'} />
                                        <p className={styles.HelpText}>{document.name}</p>
                                    </div>
                                    <div className={styles.Action} onClick={() => viewDetails('other')}>
                                        <IconWithText
                                            text={mobile ? '' : 'View Custom Details'}
                                            Icon={ChevronRight}
                                            iconAspect={'1.8rem'}
                                        />
                                    </div>
                                </FlexWrapper>
                            </div>
                        ))}
                </>
            ) : (
                <NoContent message="No completed tasks" />
            )}
        </>
    );
};

export default CompletedTasksList;
