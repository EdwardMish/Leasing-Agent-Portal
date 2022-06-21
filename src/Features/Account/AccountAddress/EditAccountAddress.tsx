import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { UserAddress } from '../../../API/Users/UsersTypes';

import { Button } from '../../../Shared/Button';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { FormButtons, FormInputs } from '../../../Shared/Forms';

interface EditAccountAddressProps {
    address: UserAddress;
    edit: (address: UserAddress) => void;
    cancel: () => void;
}

const inputStyle: React.CSSProperties = {
    margin: '0 0 0.75rem',
};

const EditAccountAddress: React.FC<EditAccountAddressProps> = ({ address, edit, cancel }): React.ReactElement => (
    <Formik
        initialValues={{
            street: address.street || '',
            street2: address.street2 || '',
            city: address.city || '',
            state: address.state || '',
            zipcode: address.zipcode || '',
        }}
        onSubmit={(userAddress) => {
            edit(userAddress);
        }}
        validationSchema={Yup.object({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipcode: Yup.string().required('Zipcode is required'),
        })}
    >
        {({ isSubmitting }) => (
            <Form style={{ width: '100%', margin: '0.75rem 0 0' }}>
                <div style={inputStyle}>
                    <FormInputs.Text
                        id="street"
                        name="street"
                        label="Street"
                        required
                        fullWidth
                        hideLabel
                        placeholder="Street / PO Box"
                    />
                </div>
                <div style={inputStyle}>
                    <FormInputs.Text
                        id="street2"
                        name="street2"
                        label="Street2"
                        fullWidth
                        hideLabel
                        placeholder="Suite / Apartment"
                    />
                </div>
                <div style={inputStyle}>
                    <FormInputs.Text id="city" name="city" label="City" required fullWidth hideLabel placeholder="City" />
                </div>
                <div style={inputStyle}>
                    <FormInputs.Text
                        id="state"
                        name="state"
                        label="State"
                        required
                        fullWidth
                        hideLabel
                        placeholder="State"
                    />
                </div>
                <div
                    style={{
                        ...inputStyle,
                        marginBottom: '1rem',
                    }}
                >
                    <FormInputs.Text
                        id="zipcode"
                        name="zipcode"
                        label="Zip"
                        required
                        fullWidth
                        hideLabel
                        placeholder="Zipcode"
                    />
                </div>
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

export default EditAccountAddress;
