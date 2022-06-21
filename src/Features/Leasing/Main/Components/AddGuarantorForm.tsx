import { API as LeasingAPI, Types as LeasingAPITypes } from 'API/Leasing';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'Shared/Button';
import { FormButtons, FormInputs, FormRow, TwoColumnFormRow } from 'Shared/Forms';
import { Description, Title } from 'Shared/PageElements';
import { addErrorMessage } from 'State/GlobalMessages/actionCreators';
import { emailValidator } from 'utils/emailValidator';
import * as Yup from 'yup';

import formStyles from '../../../../Shared/Forms/forms.module.css';
import styles from './create.module.css';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
}

const AddGuarantorForm: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { leadId: leadIdParam } = useParams<{ leadId: string }>();
    const leadId = parseInt(leadIdParam, 10);

    const [existingUser, setExistingUser] = React.useState<LeasingAPITypes.ExistingGuarantor | null>(null);

    const addGuarantor = async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
        const { firstName, lastName, email } = values;

        try {
            if (existingUser) {
                await LeasingAPI.createLeasingLeadGuarantorForExistingUser(leadId, existingUser.id);
            } else {
                await LeasingAPI.createLeasingLeadGuarantorForNewUser(leadId, firstName, lastName, email);
            }

            history.push(`/leasing/leads/${leadId}`);
        } catch (error) {
            dispatch(addErrorMessage(`Unable to add Guarantor.  Please try again.`));
            helpers.setSubmitting(false);
        }
    };

    const checkForExistingGuarantor = React.useCallback(async (value: string) => {
        if (value && emailValidator(value)) {
            const existingUserByEmail = await LeasingAPI.getGuarantorByEmail(value);
            const isValidEmail = existingUserByEmail === null || existingUserByEmail?.activeLeaseApplication === null;
            setExistingUser(existingUserByEmail);
            return isValidEmail;
        }
        return false;
    }, []);

    const goBackHandler = () => {
        history.push(`/leasing/leads/${leadId}`);
    };

    return (
        <div className={styles.NewRequestForm}>
            <Title title="Add Guarantor" />
            <Description>
                Please provide the first and last name along with the email of the guarantor to add to this lead. An
                invitation email will be sent to their email with instructions for beginning the lease application.
            </Description>
            <Formik
                initialValues={
                    {
                        firstName: '',
                        lastName: '',
                        email: '',
                    } as FormValues
                }
                onSubmit={(values, helpers) => {
                    addGuarantor(values, helpers);
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .required('First name is required')
                        .min(3, 'First name is too short')
                        .max(100, 'First name is too long'),
                    lastName: Yup.string()
                        .required('Last name is required')
                        .min(3, 'Last name is too short')
                        .max(100, 'Last name is too long'),
                    email: Yup.string()
                        .email('Invalid email')
                        .required('Email is required')
                        .test('check-email-use', 'Email in use, see error.', checkForExistingGuarantor),
                })}
                isInitialValid={false}
            >
                {({ isSubmitting, isValid }) => (
                    <Form style={formStyles}>
                        <FormRow>
                            <FormInputs.Text id="firstName" name="firstName" label="First Name" required fullWidth />
                        </FormRow>
                        <FormRow>
                            <FormInputs.Text id="lastName" name="lastName" label="Last Name" required fullWidth />
                        </FormRow>
                        <FormRow>
                            <FormInputs.Email
                                id="email"
                                name="email"
                                label="Email"
                                required
                                fullWidth
                                debounceOnChange={500}
                            />
                        </FormRow>
                        {!!existingUser && !!existingUser.activeLeaseApplication && (
                            <FormRow>
                                <div className={formStyles.Error}>
                                    <p>
                                        A user with this email address, <strong>{existingUser.name}</strong>, already has an
                                        active application with{' '}
                                        <strong>{existingUser.activeLeaseApplication?.leasingAgentName}</strong>.
                                    </p>
                                </div>
                            </FormRow>
                        )}
                        <TwoColumnFormRow>
                            <Button text="Back" inverse callback={goBackHandler} />
                            <FormButtons.Submit
                                text={isSubmitting ? 'Adding Guarantor' : 'Add Guarantor'}
                                withMarginTop
                                disable={!isValid || isSubmitting}
                            />
                        </TwoColumnFormRow>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddGuarantorForm;

