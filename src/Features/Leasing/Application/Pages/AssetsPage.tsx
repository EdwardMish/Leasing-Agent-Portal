import { Asset, AssetType, AssetTypesDisplayNames } from 'API/Leasing/Types/Asset';
import ReviewPanel from 'Features/Leasing/Application/Components/ReviewPanel';
import useAssetState from 'Features/Leasing/Application/Hooks/usePersonalApplicationAssetsState';
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

const AssetsPage = ({ previous, addAssetRoute }): React.ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { applicationId } = useLeasingState();

    const goBackHandler = () => (previous ? history.push(previous) : history.goBack());
    const {
        loadingAssets,
        assets,
        errorMessage,
        totalAmount,
        getAssets,
        deleteAsset,
        deletingAsset,
        completingAssets,
        completeAssets,
    } = useAssetState();

    const {
        application,
        loadingApplication,
        errorMessage: applicationErrorMessage,
        getPersonalLeaseApplicationForApplicant,
    } = usePersonalApplicationState();

    useEffect(() => {
        getPersonalLeaseApplicationForApplicant(applicationId);
        getAssets();
    }, [applicationId]);

    const onDeleteHandler = async (asset: Asset) => {
        await deleteAsset(asset);
        await getAssets();
    };

    const completeAssetsHandler = async () => {
        try {
            await completeAssets();
            await getPersonalLeaseApplicationForApplicant(applicationId);
            dispatch(globalMessageActionCreators.addSuccessMessage('Your Assets have been completed'));
        } catch (err) {
            dispatch(
                globalMessageActionCreators.addErrorMessage(
                    'Sorry we were unable to complete your assets, please review your data',
                    err,
                ),
            );
        }
    };

    const getSidebar = (asset: Asset) => {
        const details: SidebarLink[] = [
            {
                label: asset.type === AssetType.Other ? asset.otherTypeName : AssetTypesDisplayNames[asset.type],
                value: formatCurrency(asset?.amount || 0, 0.01, false),
            },
        ];

        details.push({
            label: 'Account Type',
            value: asset?.isJoint
                ? AccountTypeDisplayNames[AccountType.Joint]
                : AccountTypeDisplayNames[AccountType.Individual],
        });

        if (asset?.isJoint && asset?.jointOwnersName) {
            details.push({ label: 'Joint Account', value: asset.jointOwnersName });
        }

        if (asset?.attachments) {
            details.push({ label: 'Upload(s)', value: '', links: asset.attachments });
        }

        return (
            <ReviewPanel
                key={asset?.id}
                title={asset?.nickName}
                options={{
                    delete: {
                        modal: {
                            title: `Delete Asset: ${asset?.nickName}`,
                            content: 'Are you sure you want to delete this Asset?',
                            onDeleteHandler: () => onDeleteHandler(asset),
                            successMessage: 'The Asset was successfully deleted',
                            errorMessage:
                                'Sorry, we were not able to delete the Asset, please try again or contact for support',
                        },
                    },
                }}
            >
                <GeneralSidebar sidebarDetails={details} style={{ width: '95%' }} />
            </ReviewPanel>
        );
    };

    const loading = loadingAssets || deletingAsset || completingAssets || loadingApplication;

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper align="start" justify="between">
                    <Title title="Assets Overview" />
                    <SingleLabelValue
                        label="Total Assets"
                        value={formatCurrency(totalAmount, 0.01, false)}
                        style={{ width: 'auto' }}
                    />
                </FlexWrapper>
                <Divider />
                {loading && <LoadingContent />}
                {errorMessage && <NoContent message={errorMessage} />}
                {applicationErrorMessage && <NoContent message={applicationErrorMessage} />}

                {assets.map((asset) => getSidebar(asset))}

                <IconLink text="ADD ASSET" route={addAssetRoute} iconAspect="2rem" style={{ marginTop: '1rem' }} />
                <div className={styles.ButtonWrapper}>
                    <FlexWrapper align="center" justify="between" wrap>
                        <Button text="Back" callback={goBackHandler} inverse />
                        <Button
                            type="submit"
                            text={application?.completedAssets ? 'Assets Already Completed' : 'Complete Assets'}
                            callback={completeAssetsHandler}
                            disable={application?.completedAssets}
                        />
                    </FlexWrapper>
                </div>
            </main>
        </ApplicationPageWrapper>
    );
};

export default AssetsPage;
