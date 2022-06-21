import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import BusinessInformationSnippet from '../../../../Data/Snippets/BusinessInformationSnippet';
import { IconColors, InteractiveIcon, Pencil } from '../../../../Icons';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { FormButtons, FormInputs } from '../../../../Shared/Forms';
import { Welcome } from '../../../../State';
import WelcomeButtonLink from '../WelcomeButtonLink';
import { OccupantAPI } from 'API/Occupant';

import styles = require('../welcome.module.css');

export const BusinessInformationPage: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const firstOccupantToSetup: Welcome.Types.Occupant | undefined = useSelector(Welcome.selectors.occupantToSetup);

    const [mailingAddressEditMode, toggleMailingAddressEditMode] = React.useState<boolean>(false);

    const handleMailingToggle = () => {
        toggleMailingAddressEditMode(!mailingAddressEditMode);
    };

    const editMailingAddress = (address: Welcome.Types.OccupantAddress) => {
        if (firstOccupantToSetup) {
            const { id } = firstOccupantToSetup;

            OccupantAPI.updateOccupantMailingAddress(id, address).then(() => {
                dispatch({
                    type: Welcome.Actions.UPDATE_OCCUPANT_MAILING_ADDRESS,
                    payload: {
                        id,
                        address,
                    },
                } as Welcome.ActionTypes);
            });
        }
    };

    return (
        <>
            <h1>Your Business</h1>
            <p className={styles.WelcomeParagraphBlock}>
                <BusinessInformationSnippet />
            </p>
            <h2 style={{ margin: '0' }}>{firstOccupantToSetup?.name}</h2>
            <p className="text-subtext" style={{ color: 'rgb(70, 81, 100)', marginBottom: '1.25rem' }}>
                @ {firstOccupantToSetup?.propertyName}
            </p>
            <div className={styles.AddressBlock}>
                <p>
                    <b>Business Address</b>
                </p>
                <p>{firstOccupantToSetup?.physicalAddress.street1}</p>
                <p>{firstOccupantToSetup?.physicalAddress.street2}</p>
                <p>
                    {firstOccupantToSetup?.physicalAddress.city}, {firstOccupantToSetup?.physicalAddress.state}{' '}
                    {firstOccupantToSetup?.physicalAddress.zipcode}
                </p>
            </div>
            <div className={styles.AddressBlock}>
                <FlexWrapper align="center" justify="between">
                    <p>
                        <b>Mailing Address</b>
                    </p>
                    <InteractiveIcon
                        action={handleMailingToggle}
                        active={mailingAddressEditMode}
                        aspect="2rem"
                        color={IconColors.BrandBlue}
                        Icon={Pencil}
                        iconAspect="1.25rem"
                    />
                </FlexWrapper>
                {!mailingAddressEditMode && (
                    <div>
                        <p>{firstOccupantToSetup?.mailingAddress.street1}</p>
                        <p>{firstOccupantToSetup?.mailingAddress.street2}</p>
                        <p>{firstOccupantToSetup?.mailingAddress.city}</p>
                        <p>{firstOccupantToSetup?.mailingAddress.state}</p>
                        <p>{firstOccupantToSetup?.mailingAddress.zipcode}</p>
                    </div>
                )}
                {mailingAddressEditMode && (
                    <Formik
                        initialValues={{
                            street1: firstOccupantToSetup?.mailingAddress.street1 || '',
                            street2: firstOccupantToSetup?.mailingAddress.street2 || '',
                            city: firstOccupantToSetup?.mailingAddress.city || '',
                            state: firstOccupantToSetup?.mailingAddress.state || '',
                            zipcode: firstOccupantToSetup?.mailingAddress.zipcode || '',
                        }}
                        onSubmit={(values) => {
                            editMailingAddress(values);
                            toggleMailingAddressEditMode(false);
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
                                <FlexWrapper align="start" justify="between" wrap className={styles.TwoColumn}>
                                    <FormInputs.Text id="" name="street1" label="Street" required fullWidth hideLabel />
                                    <FormInputs.Text id="" name="street2" label="Suite/Unit" fullWidth hideLabel />
                                    <FormInputs.Text id="" name="city" label="City" required fullWidth hideLabel />
                                    <FormInputs.Text id="" name="state" label="State" required fullWidth hideLabel />
                                    <FormInputs.Text id="" name="zipcode" label="Zip" required fullWidth hideLabel />
                                    <FormButtons.Submit text="Update Mailing Address" disable={isSubmitting} />
                                </FlexWrapper>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
            <WelcomeButtonLink display="Continue" link="/app/welcome/business-contacts" />
        </>
    );
};

