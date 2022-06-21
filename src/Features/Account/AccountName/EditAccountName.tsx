import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { Button } from '../../../Shared/Button';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { FormButtons, FormInputs, TwoColumnFormRow } from '../../../Shared/Forms';

interface EditAccountNameProps {
    firstName: string;
    lastName: string;
    edit: (firstName: string, lastName: string) => void;
    cancel: () => void;
}

const EditAccountName: React.FC<EditAccountNameProps> = ({ firstName, lastName, edit, cancel }): React.ReactElement => (
    <Formik
        initialValues={{
            firstName,
            lastName,
        }}
        onSubmit={(values) => {
            edit(values.firstName, values.lastName);
        }}
        validationSchema={Yup.object({
            firstName: Yup.string().required('A first name is required'),
            lastName: Yup.string().required('A last name is required'),
        })}
    >
        {({ isSubmitting }) => (
            <Form style={{ width: '100%', margin: '0.75rem 0 0' }}>
                <TwoColumnFormRow withMargin>
                    <FormInputs.Text id="firstName" name="firstName" label="First Name" required hideLabel />
                    <FormInputs.Text id="lastName" name="lastName" label="Last Name" required hideLabel />
                </TwoColumnFormRow>
                <FlexWrapper
                    align="center"
                    justify="end"
                    style={{
                        margin: '0 0 1rem',
                    }}
                >
                    <Button text="Cancel" callback={cancel} inverse style={{ marginRight: '0.5rem' }} />
                    <FormButtons.Submit text="Save Changes" disable={isSubmitting} />
                </FlexWrapper>
            </Form>
        )}
    </Formik>
);

export default EditAccountName;
