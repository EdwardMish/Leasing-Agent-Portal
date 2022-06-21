import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ComplianceType } from '../../../../API/Compliance';

import { Welcome } from '../../../../State';

import coiSample from '../coi-sample.pdf';
import { ManageCompliance } from '../Compliance';
import signagePDF from '../signage-criteria.pdf';

// Snippets
import CertificateOfInsuranceSnippet from '../../../../Data/Snippets/CertificateOfInsuranceSnippet';
import PermitsSnippet from '../../../../Data/Snippets/PermitsSnippet';
import PlansSnippet from '../../../../Data/Snippets/PlansSnippet';
import SignageSnippet from '../../../../Data/Snippets/SignageSnippet';

export const CompliancePage: React.FC<{}> = () => {
    const { firstOccupantToSetup } = Welcome.Hooks.useOccupantsFromWelcomeState();

    return (
        <Switch>
            <Route path={`/app/welcome/compliance/${ComplianceType.CertificateOfInsurance}`}>
                <ManageCompliance
                    complianceType={ComplianceType.CertificateOfInsurance}
                    occupantId={firstOccupantToSetup.id}
                    title="Certificate of Insurance (COI)"
                    nextRoute={`/app/welcome/compliance/${ComplianceType.Signage}`}
                    Snippet={<CertificateOfInsuranceSnippet />}
                >
                    <p>
                        <a href={coiSample}>Certificate of Insurance Example</a>
                    </p>
                </ManageCompliance>
            </Route>
            <Route path={`/app/welcome/compliance/${ComplianceType.Signage}`}>
                <ManageCompliance
                    complianceType={ComplianceType.Signage}
                    occupantId={firstOccupantToSetup.id}
                    title="Signage"
                    nextRoute={`/app/welcome/compliance/${ComplianceType.Plans}`}
                    Snippet={<SignageSnippet />}
                >
                    <p>
                        <a href={signagePDF}>Signage Criteria</a>
                    </p>
                </ManageCompliance>
            </Route>
            <Route path={`/app/welcome/compliance/${ComplianceType.Plans}`}>
                <ManageCompliance
                    complianceType={ComplianceType.Plans}
                    occupantId={firstOccupantToSetup.id}
                    title="Plans"
                    nextRoute={`/app/welcome/compliance/${ComplianceType.Permits}`}
                    Snippet={<PlansSnippet />}
                />
            </Route>
            <Route path={`/app/welcome/compliance/${ComplianceType.Permits}`}>
                <ManageCompliance
                    complianceType={ComplianceType.Permits}
                    occupantId={firstOccupantToSetup.id}
                    title="Permits"
                    nextRoute={`/app/welcome/utility-transfer`}
                    Snippet={<PermitsSnippet />}
                />
            </Route>
            <Redirect
                exact
                from="/app/welcome/compliance"
                to={`/app/welcome/compliance/${ComplianceType.CertificateOfInsurance}`}
            />
        </Switch>
    );
};
