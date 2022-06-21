import { Liability } from 'API/Leasing/Types';
import { LiabilityType, liabilityTypesDisplayNames } from 'API/Leasing/Types/Liability';
import ReviewPanel from 'Features/Leasing/Application/Components/ReviewPanel';
import useLiabilitiesState from 'Features/Leasing/Application/Hooks/usePersonalApplicationLiabilitiesState';
import usePersonalApplicationState from 'Features/Leasing/Application/Hooks/usePersonalApplicationState';
import { AccountType, AccountTypeDisplayNames } from 'Features/Leasing/Application/Types/AccountType';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ApplicationPageWrapper from 'Shared/Application/ApplicationPageWrapper';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import IconLink from 'Shared/Forms/IconLink';
import { Divider, LoadingContent, NoContent, Title } from 'Shared/PageElements';
import { globalMessageActionCreators } from 'State';
import { useLeasingState } from 'State/Leasing/Hooks';
import { formatCurrency } from 'utils';
import GeneralSidebar, { SidebarLink, SingleLabelValue } from '../GeneralSidebar';
import styles from './assets-liabilities.module.css';

const LiabilitiesPage = ({ previous, addLiabilityRoute }): React.ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { applicationId } = useLeasingState();

    const goBackHandler = () => (previous ? history.push(previous) : history.goBack());

    const {
        loadingLiabilities,
        liabilities,
        errorMessage,
        totalAmount,
        getLiabilities,
        deleteLiability,
        deletingLiability,
        completingLiabilities,
        completeLiabilities,
    } = useLiabilitiesState();

    const {
        application,
        loadingApplication,
        errorMessage: applicationErrorMessage,
        getPersonalLeaseApplicationForApplicant,
    } = usePersonalApplicationState();

    useEffect(() => {
        getPersonalLeaseApplicationForApplicant(applicationId);
        getLiabilities();
    }, [applicationId]);

    const onDeleteHandler = async (liability: Liability) => {
        await deleteLiability(liability);
        await getLiabilities();
    };

    const completeLiabilitiesHandler = async () => {
        try {
            await completeLiabilities();
            await getPersonalLeaseApplicationForApplicant(applicationId);
            dispatch(globalMessageActionCreators.addSuccessMessage('Your Liabilities have been completed'));
        } catch (err) {
            dispatch(
                globalMessageActionCreators.addErrorMessage(
                    'Sorry we were unable to complete your liabilities, please review your data',
                    err,
                ),
            );
        }
    };

    const getSidebar = (liability: Liability) => {
        const details: SidebarLink[] = [
            {
                label:
                    liability.type === LiabilityType.Other
                        ? liability.otherTypeName
                        : liabilityTypesDisplayNames[liability.type],
                value: formatCurrency(liability?.amount || 0, 0.01, false),
            },
        ];

        details.push({
            label: 'Account Type',
            value: liability?.isJoint
                ? AccountTypeDisplayNames[AccountType.Joint]
                : AccountTypeDisplayNames[AccountType.Individual],
        });

        if (liability.isJoint && liability.jointOwnersName) {
            details.push({ label: 'Joint Account', value: liability.jointOwnersName });
        }

        if (liability?.attachments) {
            details.push({ label: 'Upload(s)', value: '', links: liability.attachments });
        }

        return (
            <ReviewPanel
                key={liability?.id}
                title={liability?.nickName}
                options={{
                    delete: {
                        modal: {
                            title: `Delete Liability: ${liability?.nickName}`,
                            content: 'Are you sure you want to delete this Liability?',
                            onDeleteHandler: () => onDeleteHandler(liability),
                            successMessage: 'The Liability was successfully deleted',
                            errorMessage: 'Sorry, we were not able to delete the Liability, please try again.',
                        },
                    },
                }}
            >
                <GeneralSidebar sidebarDetails={details} style={{ width: '95%' }} />
            </ReviewPanel>
        );
    };

    const loading = loadingLiabilities || deletingLiability || completingLiabilities || loadingApplication;

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper align="start" justify="between" fullWidth>
                    <Title title="Liabilities Overview" />
                    <SingleLabelValue
                        label="Total Liabilities"
                        value={formatCurrency(totalAmount, 0.01, false)}
                        style={{ width: 'auto' }}
                    />
                </FlexWrapper>
                <Divider />
                {loading && <LoadingContent />}
                {errorMessage && <NoContent message={errorMessage} />}
                {applicationErrorMessage && <NoContent message={applicationErrorMessage} />}
                {liabilities.map((liability) => getSidebar(liability))}

                <IconLink text="ADD LIABILITY" route={addLiabilityRoute} iconAspect="2rem" style={{ marginTop: '1rem' }} />
                <div className={styles.ButtonWrapper}>
                    <FlexWrapper align="center" justify="between" wrap>
                        <Button text="Back" callback={goBackHandler} inverse />
                        <Button
                            type="submit"
                            text={
                                application?.completedLiabilities ? 'Liabilities Already Completed' : 'Complete Liabilities'
                            }
                            callback={completeLiabilitiesHandler}
                            disable={application?.completedLiabilities}
                        />
                    </FlexWrapper>
                </div>
            </main>
        </ApplicationPageWrapper>
    );
};

export default LiabilitiesPage;
