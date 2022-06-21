import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormInputs, FormRow, TwoColumnFormRow } from 'Shared/Forms';
import { PassportIdentificationType } from 'State/Leasing/Types';

interface PassportIdentificationFormProps {
    submitHandler: (values: PassportIdentificationType) => void;
    goBackHandler: () => void;
    values: PassportIdentificationType;
}

const PassportIdentificationForm: React.FC<PassportIdentificationFormProps> = ({
    submitHandler,
    goBackHandler,
    values,
}: PassportIdentificationFormProps) => {
    const initialValues = {
        passportNumber: values?.passportNumber || '',
        passportExpirationDate: values?.passportExpirationDate || '',
        uploadPassportId: values?.uploadPassportId || null,
    };

    const validationSchema = Yup.object({
        passportNumber: Yup.string()
            .required('Passport number is required')
            .max(100, 'Passport number is too long')
            .min(3, 'Passsport number is too short'),
        passportExpirationDate: Yup.date().required('Expiration date is required'),
        uploadPassportId: Yup.mixed().required('Passport Id image is required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
            isInitialValid={initialValues.passportNumber ? true : false}
        >
            {({ isSubmitting, isValid }) => (
                <Form>
                    <FormRow>
                        <FormInputs.Text
                            id="passportNumber"
                            name="passportNumber"
                            label="Passport #"
                            fullWidth
                            required
                            placeholder="Passport ID #"
                        />
                    </FormRow>
                    <FormRow>
                        <FormInputs.Date
                            id="passportExpirationDate"
                            name="passportExpirationDate"
                            label="Expiration Date"
                            required
                            fullWidth
                            matchInput
                        />
                    </FormRow>
                    <TwoColumnFormRow>
                        <FormRow>
                            <FormInputs.UploadFile
                                id="uploadPassportId"
                                name="uploadPassportId"
                                label="Upload Passport ID Page"
                                required
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

export default PassportIdentificationForm;
