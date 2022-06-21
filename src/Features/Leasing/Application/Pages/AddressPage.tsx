import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormButtons, FormInputs, FormRow, SelectInputs, TwoColumnFormRow } from 'Shared/Forms';
import * as Yup from 'yup';
import ApplicationPageWrapper from '../../../../Shared/Application/ApplicationPageWrapper';
import { Button } from '../../../../Shared/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { loremIpsum } from '../../../../Shared/Forms/Mock/loremIpsum';
import { Description, DisclaimerText, Divider, Title } from '../../../../Shared/PageElements';
import { useLeasingState } from '../../../../State/Leasing/Hooks';
import { Address } from '../../../../State/Leasing/Types';
import styles from './address-page.module.css';

interface Properties {
    next: string;
    previous?: string;
}

function AddressPage({ next, previous }: Properties): React.ReactElement {
    const history = useHistory();

    const { address, setAddress } = useLeasingState();

    const handleSubmit = (values) => {
        setAddress({
            street: values.street,
            street2: values.street2,
            city: values.city,
            state: values.state,
            zip: values.zip,
        } as Address);

        history.push(next);
    };

    const initialValues = {
        street: address?.street || '',
        street2: address?.street2 || '',
        city: address?.city || '',
        state: address?.state || 'AL',
        zip: address?.zip || '',
    };

    return (
        <ApplicationPageWrapper>
            <main>
                <Title title="Address" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>Please provide your current home address.</Description>
                </div>
                <Divider />
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        street: Yup.string().required('Street is required').max(100, 'Street is too long'),
                        street2: Yup.string().max(100, 'Last name is too long'),
                        city: Yup.string().required('City is required'),
                        state: Yup.string().required('State is required').min(2, 'Please enter a valid state'),
                        zip: Yup.string()
                            .required('Zip is required')
                            .matches(/^\d{5}$/, 'Please enter a valid zip code'),
                    })}
                    isInitialValid={initialValues.street ? true : false}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <FormRow>
                                <FormInputs.Text
                                    id="street"
                                    name="street"
                                    label="Street"
                                    fullWidth
                                    required
                                    placeholder="Street"
                                />
                            </FormRow>

                            <FormRow>
                                <FormInputs.Text
                                    id="street2"
                                    name="street2"
                                    label="Street2"
                                    fullWidth
                                    placeholder="Apartment/Unit Number"
                                />
                            </FormRow>

                            <FormRow>
                                <FormInputs.Text id="city" name="city" label="City" fullWidth required placeholder="City" />
                            </FormRow>
                            <TwoColumnFormRow>
                                <FormRow>
                                    <SelectInputs.States id="state" label="State" name="state" fullWidth required />
                                </FormRow>
                                <FormRow>
                                    <FormInputs.Text
                                        id="zip"
                                        name="zip"
                                        label="Zip"
                                        fullWidth
                                        required
                                        placeholder="Zip Code"
                                    />
                                </FormRow>
                            </TwoColumnFormRow>

                            <FormRow>
                                <FlexWrapper align="center" justify="between">
                                    <Button
                                        text="Back"
                                        callback={() => (previous ? history.push(previous) : history.goBack())}
                                        inverse
                                    />
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

export default AddressPage;
