import { API as LeasingAPI } from 'API/Leasing';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { globalMessageActionCreators } from 'State';
import { Task } from 'Features/Leasing/Main/Types/Task';
import { TaskType } from 'Features/Leasing/Main/Types/TaskType';
import { Remove, MessageCircle, IconColors } from 'Icons';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { IconWithText, NoContent, ValueText } from 'Shared/PageElements';
import { isMobile } from 'utils/display';
import { Wrapper } from 'Shared/Tabs';
import WithActionsWrapper from 'Shared/WithActionsWrapper';
import DeleteTaskModal from '../DeleteTaskModal';
import styles from './detailsContent.module.css';
import Modal from 'Shared/Modal/Modal';

interface TasksListProps {
    leadId: number;
    applicationId: number;
    tasks: Task[];
    completed: boolean;
    refreshTasks: () => void;
}
const RemainingTasksList: React.FC<TasksListProps> = ({ leadId, applicationId, tasks, completed, refreshTasks }: TasksListProps) => {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const history = useHistory();

    const mobile = isMobile();

    const [showDeleteModal, toggleShowDeleteModal] = React.useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = React.useState<Task>();

    const messagingTabLink = `${url.substring(0, url.indexOf('/remaining'))}/messaging`;

    const handleChat = () => {
        history.push(messagingTabLink);
    };

    const handleDeleteTask = async (task: Task) => {
        switch (task.type) {
            case TaskType.Question:
                try {
                    await LeasingAPI.deletePersonalLeaseApplicationQuestion(leadId, applicationId, task.details?.id!);
                    toggleShowDeleteModal(false);
                    refreshTasks()
                } catch (error) {
                    toggleShowDeleteModal(false);
                    dispatch(globalMessageActionCreators.addErrorMessage('Unable to delete custom task', error));
                }

                break;
            case TaskType.Document:
                try {
                    await LeasingAPI.deletePersonalLeaseApplicationDocument(leadId, applicationId, task.details);
                    toggleShowDeleteModal(false);
                    refreshTasks()
                } catch (error) {
                    toggleShowDeleteModal(false);
                    dispatch(globalMessageActionCreators.addErrorMessage('Unable to delete custom task', error));
                }

                break;
            default:
                throw new Error('Task type is invalid');
        }
    };

    const actions = (task: Task) => {
        const MessageAction = !completed && (
            <Wrapper actionid={`send-message`} shouldhide={() => completed}>
                <div className={styles.Action} onClick={handleChat}>
                    <IconWithText text={mobile ? '' : 'Send Message'} Icon={MessageCircle} />
                </div>
            </Wrapper>
        );

        const deleteAction = (
            <Wrapper actionid={`delete-task`}>
                <div
                    className={styles.Action}
                    onClick={() => {
                        setTaskToDelete(task);
                        toggleShowDeleteModal(true);
                    }}
                >
                    <IconWithText
                        text={mobile ? '' : 'Delete Task'}
                        Icon={Remove}
                        color={IconColors.WarningRed}
                        style={{ justifyContent: 'right' }}
                    />
                </div>
            </Wrapper>
        );

        return [MessageAction, deleteAction];
    };

    return (
        <>
            {tasks && tasks.length > 0 ? (
                <>
                    {tasks.filter((task) => task.type === TaskType.Asset && !task.isComplete).length > 0 && (
                        <div className={styles.TasksListItem}>
                            <FlexWrapper justify="between" align="center">
                                <ValueText valueText={'Assets'} />
                                {!completed && (
                                    <div className={styles.Action} onClick={handleChat}>
                                        <IconWithText
                                            text={mobile ? '' : 'Send Message'}
                                            Icon={MessageCircle}
                                            iconAspect={'1.8rem'}
                                        />
                                    </div>
                                )}
                            </FlexWrapper>
                        </div>
                    )}

                    {tasks.filter((task) => task.type === TaskType.Liability && !task.isComplete).length > 0 && (
                        <div className={styles.TasksListItem}>
                            <FlexWrapper justify="between" align="center">
                                <ValueText valueText={'Liabilities'} />
                                {!completed && (
                                    <div className={styles.Action} onClick={handleChat}>
                                        <IconWithText
                                            text={mobile ? '' : 'Send Message'}
                                            Icon={MessageCircle}
                                            iconAspect={'1.8rem'}
                                        />
                                    </div>
                                )}
                            </FlexWrapper>
                        </div>
                    )}

                    {tasks
                        .filter((task) => task.type === TaskType.Question)
                        .map((question, index) => (
                            <div className={styles.TasksListItem} key={`${question.name}-${index}`}>
                                <WithActionsWrapper actions={actions(question)} style={{ alignSelf: 'center' }}>
                                    <FlexWrapper justify="between" align="center">
                                        <div>
                                            <ValueText valueText={'Questions'} />
                                            <p className={styles.HelpText}>{question.name}</p>
                                        </div>
                                    </FlexWrapper>
                                </WithActionsWrapper>
                            </div>
                        ))}

                    {tasks
                        .filter((task) => task.type === TaskType.Document)
                        .map((document, index) => (
                            <div className={styles.TasksListItem} key={`${document.name}-${index}`}>
                                <WithActionsWrapper actions={actions(document)} style={{ alignSelf: 'center' }}>
                                    <FlexWrapper justify="between" align="center">
                                        <div>
                                            <ValueText valueText={'Documents'} />
                                            <p className={styles.HelpText}>{document.name}</p>
                                        </div>
                                    </FlexWrapper>
                                </WithActionsWrapper>
                            </div>
                        ))}
                    {showDeleteModal && (
                        <Modal hideHeader>
                            <DeleteTaskModal
                                onClose={() => toggleShowDeleteModal(false)}
                                onOk={() => handleDeleteTask(taskToDelete!)}
                            />
                        </Modal>
                    )}
                </>
            ) : (
                <NoContent message="No remaining tasks" />
            )}
        </>
    );
};

export default RemainingTasksList;
