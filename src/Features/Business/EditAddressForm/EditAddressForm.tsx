import * as React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { Business, globalMessageActionCreators } from '../../../State';
import { OccupantAddress } from '../../../State/Shared/Types/OccupantAddress';
import { Button } from '../../../Shared/Button';
import { FormButtons, FormInputs, FormRow } from '../../../Shared/Forms';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { OccupantAPI } from 'API/Occupant';

interface EditAddressFormProps {
    address: OccupantAddress;
    callBack: () => void;
    occupantId: number | string;
}

export const EditAddressForm: React.FC<EditAddressFormProps> = ({ address, callBack, occupantId }) => {
    const dispatch = useDispatch();

    const editOccupantAddress = (updatedAddress: OccupantAddress) => {
        OccupantAPI.updateOccupantMailingAddress(occupantId, updatedAddress)
            .then(() => {
                dispatch({
                    type: Business.Actions.UPDATE_BUSINESS_OCCUPANT_MAILING_ADDRESS,
                    payload: {
                        occupantId,
                        address: updatedAddress,
                    },
                } as Business.ActionTypes);

                callBack();
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage('We were not able to update your address at this time.'),
                );
            });
    };

    return (
        <Formik
            initialValues={{
                street1: address.street1 || '',
                street2: address.street2 || '',
                city: address.city || '',
                state: address.state || '',
                zipcode: address.zipcode || '',
            }}
            onSubmit={(values) => {
                editOccupantAddress(values);
            }}
            validationSchema={Yup.object({
                street1: Yup.string().required('A street address is required'),
                city: Yup.string().required('A city is required'),
                state: Yup.string().required('A state is required'),
                zipcode: Yup.string().required('A zipcode is required'),
            })}
        >
            {({ isSubmitting }) => (
                <Form style={{ width: '100%' }}>
                    <FormRow>
                        <FormInputs.Text id="street1" name="street1" label="Street" required fullWidth hideLabel />
                    </FormRow>
                    <FormRow>
                        <FormInputs.Text id="street2" name="street2" label="Suite/Unit" fullWidth hideLabel />
                    </FormRow>
                    <FormRow>
                        <FormInputs.Text id="city" name="city" label="City" required fullWidth hideLabel />
                    </FormRow>
                    <FormRow>
                        <FormInputs.Text id="state" name="state" label="State" required fullWidth hideLabel />
                    </FormRow>
                    <FormRow>
                        <FormInputs.Text id="zipcode" name="zipcode" label="Zip" required fullWidth hideLabel />
                    </FormRow>
                    <FlexWrapper align="center" justify="start" style={{ margin: '0 0 1rem' }}>
                        <Button callback={callBack} text="Cancel" inverse />
                        <FormButtons.Submit
                            text="Update Mailing Address"
                            disable={isSubmitting}
                            style={{ marginLeft: '0.5rem' }}
                        />
                    </FlexWrapper>
                </Form>
            )}
        </Formik>
    );
};

