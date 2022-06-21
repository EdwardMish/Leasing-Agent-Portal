import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormInputs, FormRow, SelectInputs, TwoColumnFormRow } from 'Shared/Forms';
import { useLeasingState } from 'State/Leasing/Hooks';
import { StateIdentificationType } from 'State/Leasing/Types';
import * as Yup from 'yup';

interface StateIdentificationFormProps {
    submitHandler: (values: StateIdentificationType) => void;
    goBackHandler: () => void;
    values: StateIdentificationType;
}

const StateIdentificationForm: React.FC<StateIdentificationFormProps> = ({
    submitHandler,
    goBackHandler,
    values,
}: StateIdentificationFormProps) => {
    const { address } = useLeasingState();

    const initialValues = {
        identificationNumber: values?.identificationNumber || '',
        stateOfIssue: values?.stateOfIssue || address.state,
        stateIdExpirationDate: values?.stateIdExpirationDate || '',
        uploadIdFront: values?.uploadIdFront || null,
        uploadIdBack: values?.uploadIdBack || null,
    };

    const validationSchema = Yup.object({
        identificationNumber: Yup.string()
            .required('Identification number is required')
            .max(100, 'Identification number is too long'),
        stateOfIssue: Yup.string().required('State of Issue is required').max(100, 'State of Issue is too long'),
        stateIdExpirationDate: Yup.date().required('Expiration date is required'),
        uploadIdFront: Yup.mixed().required('Identification front image is required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
            isInitialValid={initialValues.identificationNumber ? true : false}
        >
            {({ isSubmitting, isValid }) => (
                <Form>
                    <FormRow>
                        <FormInputs.Text
                            id="identificationNumber"
                            name="identificationNumber"
                            label="Identification Number"
                            fullWidth
                            required
                            placeholder="Identification Number"
                        />
                    </FormRow>
                    <FormRow>
                        <SelectInputs.States
                            id="stateOfIssue"
                            label="State of Issue"
                            name="stateOfIssue"
                            fullWidth
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <FormInputs.Date
                            id="stateIdExpirationDate"
                            name="stateIdExpirationDate"
                            label="Expiration Date"
                            required
                            fullWidth
                            matchInput
                        />
                    </FormRow>
                    <TwoColumnFormRow>
                        <FormRow>
                            <FormInputs.UploadFile
                                id="uploadIdFront"
                                name="uploadIdFront"
                                label="Upload ID Front"
                                required
                                accept="application/pdf,image/*"
                            />
                        </FormRow>
                        <FormRow>
                            <FormInputs.UploadFile
                                id="uploadIdBack"
                                name="uploadIdBack"
                                label="Upload ID Back"
                                accept="application/pdf,image/*"
                            />
                        </FormRow>
                    </TwoColumnFormRow>

                    <FormRow>
                        <FlexWrapper align="center" justify="between">
                            <Button text="Back" callback={goBackHandler} inverse />
                            <FormButtons.Submit text="Next" disable={isSubmitting || !isValid} />
                        </FlexWrapper>
                    </FormRow>
                </Form>
            )}
        </Formik>
    );
};

export default StateIdentificationForm;
