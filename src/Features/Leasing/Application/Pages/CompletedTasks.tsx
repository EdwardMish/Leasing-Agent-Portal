import { Document, Question } from 'API/Leasing/Types';
import { ChevronRight } from 'Icons';
import React, { useEffect } from 'react';
import { FlexWrapper } from 'Shared/FlexWrapper';
import IconLink from 'Shared/Forms/IconLink';
import { Divider } from 'Shared/PageElements';
import { isMobile } from 'utils/display';
import styles from './completed-task.module.css';

interface CompletedTasksProps {
    routes: Record<string, string>;
    application: any;
    documents: Document[];
    questions: Question[];
    setSelectedTab: (arg0: string) => void;
}

const CompletedTasks = ({
    routes,
    application,
    documents = [],
    questions = [],
    setSelectedTab,
}: CompletedTasksProps): React.ReactElement => {
    const mobile = isMobile();

    useEffect(() => {
        setSelectedTab('completed');
    }, []);

    return (
        <div>
            {application?.completedAssets && (
                <div className={styles.TasksListItem}>
                    <FlexWrapper justify="between" align="center">
                        <p className={styles.HeaderText}>Assets</p>
                        <div className={styles.Action}>
                            <IconLink
                                Icon={ChevronRight}
                                route={routes.ASSETS}
                                text={mobile ? '' : 'VIEW ASSETS'}
                                iconOnLeft={false}
                                iconAspect="2rem"
                            />
                        </div>
                    </FlexWrapper>
                </div>
            )}
            {application?.completedLiabilities && (
                <div className={styles.TasksListItem}>
                    <FlexWrapper justify="between" align="center">
                        <p className={styles.HeaderText}>Liabilities</p>
                        <div className={styles.Action}>
                            <IconLink
                                Icon={ChevronRight}
                                route={routes.LIABILITIES}
                                text={mobile ? '' : 'VIEW LIABILITIES'}
                                iconOnLeft={false}
                                iconAspect="2rem"
                            />
                        </div>
                    </FlexWrapper>
                </div>
            )}
            {!!documents && documents.length > 0 && (
                <div className={styles.TasksListItem}>
                    <FlexWrapper justify="between" align="center">
                        <p className={styles.HeaderText}>Documents</p>

                        <IconLink
                            Icon={ChevronRight}
                            route={routes.DOCUMENTS}
                            text={mobile ? '' : 'VIEW DOCUMENTS'}
                            iconOnLeft={false}
                            iconAspect="2rem"
                        />
                    </FlexWrapper>
                    <Divider equalMargin />
                    <div>
                        {documents.map((doc) => (
                            <li className={styles.ListItems} key={doc?.id}>
                                {doc?.name}
                            </li>
                        ))}
                    </div>
                </div>
            )}
            {!!questions && questions.length > 0 && (
                <div className={styles.TasksListItem}>
                    <FlexWrapper justify="between" align="center">
                        <p className={styles.HeaderText}>Questions</p>

                        <IconLink
                            Icon={ChevronRight}
                            route={routes.QUESTIONS}
                            text={mobile ? '' : 'VIEW QUESTIONS'}
                            iconOnLeft={false}
                            iconAspect="2rem"
                        />
                    </FlexWrapper>
                    <Divider equalMargin />
                    <div>
                        {questions.map((question) => (
                            <li className={styles.ListItems} key={question?.id}>
                                {question?.question}
                            </li>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompletedTasks;
