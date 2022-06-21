import useDocumentsState from 'Features/Leasing/Application/Hooks/usePersonalApplicationDocumentsState';
import useQuestionsState from 'Features/Leasing/Application/Hooks/usePersonalApplicationQuestionsState';
import usePersonalApplicationState from 'Features/Leasing/Application/Hooks/usePersonalApplicationState';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ApplicationPageWrapper from 'Shared/Application/ApplicationPageWrapper';
import { loremIpsum } from 'Shared/Forms/Mock/loremIpsum';
import { Description, DisclaimerText, Title } from 'Shared/PageElements';
import { Header, HeaderLink, LinksPanel, Tabs } from 'Shared/Tabs';
import { useLeasingState } from 'State/Leasing/Hooks';
import Sidebar from '../Sidebar';
import CompletedTasks from './CompletedTasks';
import styles from './overview-page.module.css';
import RequiredTasks from './RequiredTasks';
import Messaging from './Messages';
import { SpinningLoader } from 'Icons/Animated';
import { FlexWrapper } from 'Shared/FlexWrapper';

interface Properties {
    routes: Record<string, string>;
}

function OverviewPage({ routes }: Properties): React.ReactElement {
    const { url } = useRouteMatch();
    const { applicationId, isLoaded } = useLeasingState();
    const { loadingDocuments, selectRequiredDocuments, selectCompletedDocuments, getDocuments } = useDocumentsState();

    const { loadingQuestions, filteredOpenQuestions, filteredAnsweredQuestions, getQuestions } = useQuestionsState();

    const { application, loadingApplication, getPersonalLeaseApplicationForApplicant } = usePersonalApplicationState();

    const [selectedTab, setSelectedTab] = useState<string>();

    useEffect(() => {
        if (applicationId && selectedTab) {
            getPersonalLeaseApplicationForApplicant(applicationId);
            getDocuments();
            getQuestions();
        }
    }, [applicationId, selectedTab]);

    const loading = loadingApplication || loadingDocuments || loadingQuestions || !isLoaded;

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper justify="start" align="center" gap="1rem">
                    <Title title="Application Overview" />
                    {loading && <SpinningLoader aspect="1.5rem" />}
                </FlexWrapper>

                <div className={styles.LoremIpsumWrapper}>
                    <Description noBottomPadding>
                        To complete your application, you will need to provide additional documentation to us.
                    </Description>
                </div>

                <Sidebar application={application} />
                {!loading && (
                    <Tabs>
                        <Header style={{ marginBottom: '1rem' }}>
                            <HeaderLink key="required-tab" name="Required" link={`${url}/required`} />
                            <HeaderLink key="completed-tab" name="Completed" link={`${url}/completed`} />
                            <HeaderLink key="messages-tab" name="Messages" link={`${url}/messages`} />
                        </Header>

                        <LinksPanel>
                            <Switch>
                                <Route exact path={`${url}/required`}>
                                    <RequiredTasks
                                        routes={routes}
                                        application={application}
                                        documents={selectRequiredDocuments()}
                                        questions={filteredOpenQuestions()}
                                        setSelectedTab={setSelectedTab}
                                    />
                                </Route>
                                <Route exact path={`${url}/completed`}>
                                    <CompletedTasks
                                        routes={routes}
                                        application={application}
                                        documents={selectCompletedDocuments()}
                                        questions={filteredAnsweredQuestions()}
                                        setSelectedTab={setSelectedTab}
                                    />
                                </Route>
                                <Route exact path={`${url}/messages`}>
                                    {applicationId && <Messaging applicationId={applicationId} />}
                                </Route>
                                <Redirect to={`${url}/required`} />
                            </Switch>
                        </LinksPanel>
                    </Tabs>
                )}
                <DisclaimerText disclaimerText={`Legal Disclaimer ${loremIpsum}`} footerText />
            </main>
        </ApplicationPageWrapper>
    );
}

export default OverviewPage;
