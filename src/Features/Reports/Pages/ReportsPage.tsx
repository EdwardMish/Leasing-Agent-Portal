import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Seperator from '../../../Shared/Seperator';

import { PageWrapper } from '../../../Shared/PageWrapper';
import AccountInformation from '../AccountInformation';
import { IssueCountsByRegion } from '../IssueCountsByRegion';
import { IssueCountsByType } from '../IssueCountsByType';
import { AuthenticatedLink } from '../../../Shared/Documents/AuthenticatedLink';

const styles = require('./reports.module.css');

export const ReportsPage: React.FC<{}> = () => {
    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <PageWrapper pageTitle="Reports">
                        <h1>Reports</h1>
                        <div className={styles.Reports}>
                            <AccountInformation.OccupantAccountInformation />
                            <Seperator />
                            <IssueCountsByType />
                            <Seperator />
                            <IssueCountsByRegion />
                            <Seperator />
                        </div>
                        <div>
                            <h2>Downloadable Reports</h2>
                            <div className={styles.ReportsSection}>
                                <h3>Users</h3>
                                <div>
                                    <AuthenticatedLink
                                        filename={`owner-operator-user-report-${Date.now()}.csv`}
                                        url={`${API_ROOT}/reports/download?reportType=AdminReport`}
                                    >
                                        Download Owner/Operator User Report
                                    </AuthenticatedLink>
                                </div>
                                <div>
                                    <AuthenticatedLink
                                        filename={`neighbor-user-report-${Date.now()}.csv`}
                                        url={`${API_ROOT}/reports/download?reportType=TenantReport`}
                                    >
                                        Download Neighbor User Report
                                    </AuthenticatedLink>
                                </div>
                            </div>
                            <div className={styles.ReportsSection}>
                                <h3>Issues</h3>
                                <div>
                                    <AuthenticatedLink
                                        filename={`issue-report-${Date.now()}.csv`}
                                        url={`${API_ROOT}/reports/download?reportType=IssueReport`}
                                    >
                                        Download Issue Report
                                    </AuthenticatedLink>
                                </div>
                            </div>
                            <div className={styles.ReportsSection}>
                                <h3>Properties / Neighbors</h3>
                                <div>
                                    <AuthenticatedLink
                                        filename={`neighbor-summary-report-${Date.now()}.csv`}
                                        url={`${API_ROOT}/reports/download?reportType=MasterOccupantSummaryReport`}
                                    >
                                        Download Neighbor Summary Report
                                    </AuthenticatedLink>
                                </div>
                                <div>
                                    <AuthenticatedLink
                                        filename={`neighbor-detail-report-${Date.now()}.csv`}
                                        url={`${API_ROOT}/reports/download?reportType=MasterOccupantReport`}
                                    >
                                        Download Neighbor Detail Report
                                    </AuthenticatedLink>
                                </div>
                                <div>
                                    <AuthenticatedLink
                                        filename={`neighbor-compliance-report-${Date.now()}.csv`}
                                        url={`${API_ROOT}/reports/download?reportType=ComplianceReport`}
                                    >
                                        Download Neighbor Compliance Report
                                    </AuthenticatedLink>
                                </div>
                            </div>
                            <div className={styles.ReportsSection}>
                                <h3>Inspections</h3>
                                <div>
                                    <AuthenticatedLink
                                        filename={`inspections-report-${Date.now()}.csv`}
                                        url={`${API_ROOT}/reports/inspections`}
                                    >
                                        Download Inspections Report
                                    </AuthenticatedLink>
                                </div>
                            </div>
                            <div className={styles.ReportsSection}>
                                <h3>Sales</h3>
                                <div>
                                    <AuthenticatedLink
                                        filename={`neighbor-sales-detail-report-${Date.now()}.csv`}
                                        url={`${API_ROOT}/reports/download?reportType=MasterOccupantSalesDetailReport`}
                                    >
                                        Download Neighbor Sales Detail Report
                                    </AuthenticatedLink>
                                </div>
                            </div>
                        </div>
                    </PageWrapper>
                </Route>
            </Switch>
        </>
    );
};
