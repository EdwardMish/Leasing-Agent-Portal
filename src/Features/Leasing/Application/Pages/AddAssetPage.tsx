import { AssetType, AssetTypesDisplayNames } from 'API/Leasing/Types/Asset';
import useAssetState from 'Features/Leasing/Application/Hooks/usePersonalApplicationAssetsState';
import { AccountType, AccountTypeDisplayNames } from 'Features/Leasing/Application/Types/AccountType';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ApplicationPageWrapper from 'Shared/Application/ApplicationPageWrapper';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormInputs, FormRow, SelectInputs, TwoColumnFormRow } from 'Shared/Forms';
import { Label } from 'Shared/Forms/Label';
import { Divider, Title } from 'Shared/PageElements';
import { globalMessageActionCreators } from 'State';
import { unformatNumber } from 'utils';
import * as Yup from 'yup';
import styles from './assets-liabilities.module.css';

interface Properties {
    previous?: string;
}

const AddAssetPage = ({ previous }: Properties): React.ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { createAsset, creatingAsset } = useAssetState();

    const { state: linkedState } = useLocation<Record<string, any>>();

    const goBackLink = linkedState?.goBackLink;

    const goBackHandler = () => {
        if (goBackLink) {
            history.push(goBackLink);
        } else if (previous) {
            history.push(previous);
        } else {
            history.goBack();
        }
    };

    const initialValues = {
        assetType: 'cash',
        assetAmount: '',
        otherAssetName: '',
        accountType: AccountType.Individual,
        accountCoOwner: '',
        nickname: '',
        attachment: null,
    };

    const validationSchema = Yup.object({
        assetType: Yup.string().required('Asset type is required'),
        assetAmount: Yup.string()
            .required('Asset amount is required')
            .max(13, 'Asset amount limit has been reached')
            .test({
                name: 'minAsset',
                message: 'Asset amount must be greater than 0',
                test: (value) => {
                    return value !== null && unformatNumber(value) > 0;
                },
            }),
        otherAssetName: Yup.string()
            .min(3, 'Other Asset Name must be larger than 3 characters')
            .max(100, 'Other Asset Name must be shorter than 100 characters'),
        accountType: Yup.string().required('Account type is required'),
        accountCoOwner: Yup.string().when('accountType', {
            is: AccountType.Joint,
            then: Yup.string()
                .required('A co-owner is required')
                .min(5, 'A co-owners name must be 5 characters or more')
                .max(100, 'A co-owners name must be 100 characters or less'),
        }),
        nickname: Yup.string()
            .required('Nickname is required')
            .min(3, 'Nickname must be greater than 3 characters')
            .max(100, 'Nickname must be smaller than 100 characters'),
        attachment: Yup.mixed().required('Attachment is required'),
    });

    const submitHandler = async (values) => {
        try {
            await createAsset(values);

            dispatch(globalMessageActionCreators.addSuccessMessage('Your Asset data was successfully sent'));
            history.push(previous || goBackLink);
        } catch (err) {
            dispatch(
                globalMessageActionCreators.addErrorMessage(
                    'Sorry we were unable to send your asset, please review your data',
                    err,
                ),
            );
        }
    };

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper justify="between" align="start">
                    <Title title="Asset Upload" />
                </FlexWrapper>
                <Divider />

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler}>
                    {({ isSubmitting, isValid, values, setFieldValue }) => (
                        <Form>
                            <TwoColumnFormRow>
                                <FormRow>
                                    <SelectInputs.Select
                                        id="assetType"
                                        name="assetType"
                                        label="Asset Type"
                                        required
                                        keyValues={AssetTypesDisplayNames}
                                    />
                                </FormRow>
                                {values.assetType !== AssetType.Other && (
                                    <FormRow>
                                        <FormInputs.Money
                                            id="assetAmount"
                                            name="assetAmount"
                                            label="Asset Amount"
                                            required
                                        />
                                    </FormRow>
                                )}
                            </TwoColumnFormRow>
                            {values.assetType === AssetType.Other && (
                                <TwoColumnFormRow>
                                    <FormRow>
                                        <FormInputs.Text
                                            id="otherAssetName"
                                            name="otherAssetName"
                                            label="Other Asset Name"
                                            required={values.assetType === AssetType.Other}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <FormInputs.Money
                                            id="assetAmount"
                                            name="assetAmount"
                                            label="Asset Amount"
                                            required
                                        />
                                    </FormRow>
                                </TwoColumnFormRow>
                            )}
                            <TwoColumnFormRow>
                                <FormRow>
                                    <SelectInputs.Select
                                        id="accountType"
                                        name="accountType"
                                        label="Account Type"
                                        keyValues={AccountTypeDisplayNames}
                                        fullWidth
                                        onChange={(e: React.ChangeEvent<any>) => {
                                            if (e.currentTarget.value === AccountType.Individual) {
                                                setFieldValue('accountCoOwner', '');
                                            }
                                        }}
                                    />
                                </FormRow>
                                <FormRow>
                                    {values.accountType === AccountType.Joint && (
                                        <FormInputs.Text
                                            id="accountCoOwner"
                                            name="accountCoOwner"
                                            label="Account Co-Owner"
                                            required={values.accountType === AccountType.Joint}
                                        />
                                    )}
                                </FormRow>
                            </TwoColumnFormRow>
                            <FormRow>
                                <FormInputs.Text id="nickname" name="nickname" label="Nickname" required />
                            </FormRow>
                            <Label label="Please upload supporting documentation" id="upload" required margin="0 0 1rem" />
                            <FormRow>
                                <FormInputs.UploadFile
                                    id="attachment"
                                    name="attachment"
                                    label="Select Document"
                                    required
                                    accept="application/pdf,image/*"
                                    showThumbnail={false}
                                    multiple={true}
                                />
                            </FormRow>
                            <FormRow>
                                <div className={styles.ButtonWrapper}>
                                    <FlexWrapper align="center" justify="between">
                                        <Button text="Back" callback={goBackHandler} inverse />
                                        <FormButtons.Submit
                                            text={creatingAsset ? 'Saving' : 'Save'}
                                            disable={isSubmitting || !isValid}
                                        />
                                    </FlexWrapper>
                                </div>
                            </FormRow>
                        </Form>
                    )}
                </Formik>
            </main>
        </ApplicationPageWrapper>
    );
};

export default AddAssetPage;
