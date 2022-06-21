import React from 'react';
import { useHistory, useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

import { Header, HeaderLink, LinksPanel, Tabs } from '../../../../Shared/Tabs';

import ApplicationPageWrapper from '../../../../Shared/Application/ApplicationPageWrapper';
import { Description, Title, DisclaimerText } from '../../../../Shared/PageElements';
import { loremIpsum } from '../../../../Shared/Forms/Mock/loremIpsum';
import StateIdentificationForm from './StateIdentificationForm';
import PassportIdentificationForm from './PassportIdentificationForm';
import { useLeasingState } from '../../../../State/Leasing/Hooks';
import { IdentificationType } from '../../../../State/Leasing/Types';

import styles from './personal-information-page.module.css';

interface Properties {
    next: string;
    previous?: string;
}

const IdentityPage = ({ next, previous }: Properties): React.ReactElement => {
    const history = useHistory();
    const { identification, setIdentification } = useLeasingState();

    const handleSubmitIdentification = (values: IdentificationType): void => {
        setIdentification(values);
        history.push(next);
    };

    const goBackHandler = () => (previous ? history.push(previous) : history.goBack());

    const { url } = useRouteMatch();

    const selectedTabIndex = !!identification?.stateOfIssue ? 0 : 1;

    return (
        <ApplicationPageWrapper>
            <main>
                <Title title="Identification" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>
                        Please provide the required information below and upload a photo. A photo ID can be either a state
                        issued ID or passport.
                    </Description>
                </div>
                <DisclaimerText disclaimerText="Only one form of Identification is required" paddingBottom />

                <Tabs defaultTab={selectedTabIndex}>
                    <Header style={{ marginBottom: '1rem' }}>
                        <HeaderLink
                            key="identity-tab-header-item-stateIdentification}"
                            name="State Identification"
                            link={`${url}/state-identification`}
                        />
                        <HeaderLink
                            key="identity-tab-header-item-passportIdentification}"
                            name="Passport"
                            link={`${url}/passport-identification`}
                        />
                    </Header>

                    <LinksPanel>
                        <Switch>
                            <Route exact path={`${url}/state-identification`}>
                                <StateIdentificationForm
                                    submitHandler={handleSubmitIdentification}
                                    goBackHandler={goBackHandler}
                                    values={identification}
                                />
                            </Route>
                            <Route exact path={`${url}/passport-identification`}>
                                <PassportIdentificationForm
                                    submitHandler={handleSubmitIdentification}
                                    goBackHandler={goBackHandler}
                                    values={identification}
                                />
                            </Route>
                            <Redirect from={url} to={`${url}/state-identification`} />
                        </Switch>
                    </LinksPanel>
                </Tabs>
                <DisclaimerText disclaimerText={`Legal Disclaimer ${loremIpsum}`} footerText />
            </main>
        </ApplicationPageWrapper>
    );
};

export default IdentityPage;
