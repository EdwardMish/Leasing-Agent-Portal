import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SSN_REGEXP } from 'utils/validateSSNFormat';
import * as Yup from 'yup';
import ApplicationPageWrapper from '../../../../Shared/Application/ApplicationPageWrapper';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { FormButtons, FormInputs, FormRow, TwoColumnFormRow } from '../../../../Shared/Forms';
import { loremIpsum } from '../../../../Shared/Forms/Mock/loremIpsum';
import validateOver18YearsOld from '../../../../Shared/Forms/Validation/validateOver18YearsOld';
import { Description, DisclaimerText, Divider, Title } from '../../../../Shared/PageElements';
import { useLeasingState } from '../../../../State/Leasing/Hooks';
import { PersonalInformation } from '../../../../State/Leasing/Types';
import styles from './personal-information-page.module.css';

interface Properties {
    next: string;
    previous: string;
}

function PersonalInformationPage({ next, previous }: Properties): React.ReactElement {
    const history = useHistory();

    const { personalInformation, setPersonalInformation } = useLeasingState();

    const handleSubmit = (values) => {
        setPersonalInformation({
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            socialSecurityNumber: values.socialSecurityNumber,
            dateOfBirth: values.dateOfBirth + 'T00:00:00',
        } as PersonalInformation);

        history.push(next);
    };

    const initialValues = {
        firstName: personalInformation?.firstName || '',
        lastName: personalInformation?.lastName || '',
        phone: personalInformation?.phone || '',
        socialSecurityNumber: personalInformation?.socialSecurityNumber || '',
        dateOfBirth: personalInformation?.dateOfBirth ? format(new Date(personalInformation.dateOfBirth), 'yyyy-MM-dd') : '',
    };

    return (
        <ApplicationPageWrapper>
            <main>
                <Title title="Personal Data" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>Please provide the required information below.</Description>
                </div>
                <Divider />
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        firstName: Yup.string().required('First Name is required').max(100, 'First Name is too long'),
                        lastName: Yup.string().required('Last Name is required').max(100, 'Last Name is too long'),
                        phone: Yup.string()
                            .required('Phone Number is required')
                            .min(10, 'Phone Number is too short')
                            .max(20, 'Phone Number is too long'),
                        socialSecurityNumber: Yup.string()
                            .required('Social Security Number is required')
                            .matches(SSN_REGEXP, 'SSN must be in the format xxx-xx-xxxx'),
                        dateOfBirth: validateOver18YearsOld(),
                    })}
                    isInitialValid={initialValues.dateOfBirth ? true : false}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <FormRow>
                                <FormInputs.Text
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    fullWidth
                                    required
                                    placeholder="First Name"
                                />
                            </FormRow>
                            <FormRow>
                                <FormInputs.Text
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    fullWidth
                                    required
                                    placeholder="Last Name"
                                />
                            </FormRow>

                            <FormRow>
                                <FormInputs.Telephone id="phone" name="phone" label="Phone Number" required fullWidth />
                            </FormRow>
                            <TwoColumnFormRow>
                                <FormRow>
                                    <FormInputs.Text
                                        id="socialSecurityNumber"
                                        name="socialSecurityNumber"
                                        label="Social Security Number"
                                        fullWidth
                                        required
                                        placeholder="Social Security Number"
                                    />
                                </FormRow>
                                <FormRow>
                                    <FormInputs.Date
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        label="Date Of Birth"
                                        required
                                        fullWidth
                                        matchInput
                                    />
                                </FormRow>
                            </TwoColumnFormRow>

                            <FormRow>
                                <FlexWrapper align="center" justify="between">
                                    <FormButtons.Back routeTo={previous} />
                                    <FormButtons.Submit text="Next" disable={isSubmitting || !isValid} />
                                </FlexWrapper>
                            </FormRow>
                        </Form>
                    )}
                </Formik>
                <DisclaimerText disclaimerText={`Legal Disclaimer ${loremIpsum}`} footerText />
            </main>
        </ApplicationPageWrapper>
    );
}

export default PersonalInformationPage;
