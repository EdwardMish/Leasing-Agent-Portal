import { LiabilityType, liabilityTypesDisplayNames } from 'API/Leasing/Types/Liability';
import useLiabilitiestate from 'Features/Leasing/Application/Hooks/usePersonalApplicationLiabilitiesState';
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

const AddLiabilityPage = ({ previous }: Properties): React.ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { createLiability, creatingLiability } = useLiabilitiestate();
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
        liabilityType: 'creditCard',
        liabilityAmount: '',
        otherLiabilityName: '',
        accountType: AccountType.Individual,
        accountCoOwner: '',
        nickname: '',
        attachment: null,
    };

    const validationSchema = Yup.object({
        liabilityType: Yup.string().required('Liability type is required'),
        liabilityAmount: Yup.string()
            .required('Liability amount is required')
            .max(13, 'Liability amount limit has been reached')
            .test({
                name: 'minLiability',
                message: 'Liability amount must be greater than 0',
                test: (value) => {
                    return value !== null && unformatNumber(value) > 0;
                },
            }),
        otherLiabilityName: Yup.string()
            .min(3, 'Other Liability Name must be larger than 3 characters')
            .max(100, 'Other Liability Name must be shorter than 100 characters'),
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
            await createLiability(values);

            dispatch(globalMessageActionCreators.addSuccessMessage('Your Liability data was successfully sent'));
            history.push(previous || goBackLink);
        } catch (err) {
            dispatch(
                globalMessageActionCreators.addErrorMessage(
                    'Sorry we were unable to send your liability, please review your data',
                    err,
                ),
            );
        }
    };

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper justify="between" align="start">
                    <Title title="Liability Upload" />
                </FlexWrapper>
                <Divider />

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler}>
                    {({ isSubmitting, isValid, values, setFieldValue }) => (
                        <Form>
                            <TwoColumnFormRow>
                                <FormRow>
                                    <SelectInputs.Select
                                        id="liabilityType"
                                        name="liabilityType"
                                        label="Liability Type"
                                        required
                                        keyValues={liabilityTypesDisplayNames}
                                    />
                                </FormRow>
                                {values.liabilityType !== LiabilityType.Other && (
                                    <FormRow>
                                        <FormInputs.Money
                                            id="liabilityAmount"
                                            name="liabilityAmount"
                                            label="Liability Amount"
                                            required
                                        />
                                    </FormRow>
                                )}
                            </TwoColumnFormRow>
                            {values.liabilityType === LiabilityType.Other && (
                                <TwoColumnFormRow>
                                    <FormRow>
                                        <FormInputs.Text
                                            id="otherLiabilityName"
                                            name="otherLiabilityName"
                                            label="Other Liability Name"
                                            required={values.liabilityType === LiabilityType.Other}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <FormInputs.Money
                                            id="liabilityAmount"
                                            name="liabilityAmount"
                                            label="Liability Amount"
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
                                    multiple
                                />
                            </FormRow>
                            <FormRow>
                                <div className={styles.ButtonWrapper}>
                                    <FlexWrapper align="center" justify="between">
                                        <Button text="Back" callback={goBackHandler} inverse />
                                        <FormButtons.Submit
                                            text={creatingLiability ? 'Saving' : 'Save'}
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

export default AddLiabilityPage;
