import { API as LeasingAPI } from 'API/Leasing';
import CompletedTasks from 'Features/Leasing/Main/Components/DetailsTabContents/CompletedTasks';
import Messaging from 'Features/Leasing/Main/Components/DetailsTabContents/Messaging';
import RemainingTasks from 'Features/Leasing/Main/Components/DetailsTabContents/RemainingTasks';
import { Task } from 'Features/Leasing/Main/Types/Task';
import { TaskType } from 'Features/Leasing/Main/Types/TaskType';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { LoadingContent } from 'Shared/PageElements';

interface TaskCompleteStatus {
    assets: boolean;
    liabilities: boolean;
    questions: boolean;
    documents: boolean;
}

interface Properties {
    leadId: number;
    applicationId: number;
    guarantor?: string;
    remaining?: boolean;
    completed?: boolean;
    messaging?: boolean;
    messagingTabLink?: string;
    taskCompleteStatus?: TaskCompleteStatus;
    applicationCompleted?: boolean;
}

const ProfileSummaryTabContents: React.FC<Properties> = ({
    leadId,
    applicationId,
    remaining,
    completed,
    messaging,
    taskCompleteStatus,
    applicationCompleted,
}) => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const loadTasks = async () => {
        let loadedTasks: Task[] = [];
        setLoading(true);
        if (taskCompleteStatus) {
            const assets = await LeasingAPI.getAssets(applicationId);

            loadedTasks = [
                ...loadedTasks,
                ...(assets.length > 0
                    ? assets.map(
                          (asset) =>
                              ({
                                  type: TaskType.Asset,
                                  name: asset.nickName,
                                  isComplete: taskCompleteStatus.assets,
                              } as Task),
                      )
                    : [
                          {
                              type: TaskType.Asset,
                              name: 'Asset',
                              isComplete: taskCompleteStatus.assets,
                          } as Task,
                      ]),
            ];

            const liabilities = await LeasingAPI.getLiabilities(applicationId);
            loadedTasks = [
                ...loadedTasks,
                ...(liabilities.length > 0
                    ? liabilities.map(
                          (liability) =>
                              ({
                                  type: TaskType.Liability,
                                  name: liability.nickName,
                                  isComplete: taskCompleteStatus.liabilities,
                              } as Task),
                      )
                    : [
                          {
                              type: TaskType.Liability,
                              name: 'Liability',
                              isComplete: taskCompleteStatus.liabilities,
                          } as Task,
                      ]),
            ];

            const questions = await LeasingAPI.getQuestions(applicationId);
            loadedTasks = [
                ...loadedTasks,
                ...questions.map(
                    (question) =>
                        ({
                            type: TaskType.Question,
                            name: question.question,
                            isComplete: !!question.answeredDate,
                            details: question,
                        } as Task),
                ),
            ];

            const documents = await LeasingAPI.getDocuments(applicationId);
            loadedTasks = [
                ...loadedTasks,
                ...documents.map(
                    (document) =>
                        ({
                            type: TaskType.Document,
                            name: document.name,
                            isComplete: !!document.dateUploaded,
                            details: document,
                        } as Task),
                ),
            ];

            setTasks(loadedTasks);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        loadTasks();
    }, [taskCompleteStatus]);

    const { url } = useRouteMatch();
    const summaryUrl = `${url.substring(0, url.indexOf('/activity'))}/summary`;
    return !loading ? (
        <>
            {remaining && (
                <RemainingTasks
                    leadId={leadId}
                    applicationId={applicationId}
                    tasks={tasks.filter((task) => !task.isComplete)}
                    completed={!!applicationCompleted}
                    refreshTasks={() => {
                        loadTasks();
                    }}
                />
            )}
            {completed && <CompletedTasks tasks={tasks.filter((task) => task.isComplete)} summaryUrl={summaryUrl} />}
            {messaging && <Messaging applicationId={applicationId} completed={!!applicationCompleted} />}
        </>
    ) : (
        <LoadingContent />
    );
};

export default ProfileSummaryTabContents;
