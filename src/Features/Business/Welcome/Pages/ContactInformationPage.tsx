import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import UsersAPI from '../../../../API/Users';
import { UserAddress } from '../../../../API/Users/UsersTypes';

import { globalMessageActionCreators } from '../../../../State';
import { selectors } from '../../../../State/CurrentUser';

import { Phone, PhoneType } from '../../../../Types/User';

import { formatPhone } from '../../../../utils/formatPhone';

import UserContactInformationSnippet from '../../../../Data/Snippets/UserContactInformationSnippet';

import { FormButtons, FormInputs } from '../../../../Shared/Forms';

import WelcomeButtonLink from '../WelcomeButtonLink';

const inputStyle: React.CSSProperties = {
    margin: '0 0 1rem',
};

const ContactInformationPage: React.FC<{ nextRoute: string }> = ({ nextRoute }): React.ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUserId: number = useSelector(selectors.currentUserId);

    const [address, setAddress] = React.useState<UserAddress>();
    const [phones, setPhones] = React.useState<Phone[]>([]);

    const getPhones = async () => {
        const userPhones = await UsersAPI.getUserPhones(currentUserId);

        if (userPhones) setPhones(userPhones as Phone[]);
    };

    const getAddress = async (): Promise<void> => {
        const userAddress = await UsersAPI.getUserAddress(currentUserId).catch((err) => {
            dispatch(
                globalMessageActionCreators.addErrorMessage('Unable to retrieve contact information', err),
            );
        });

        if (userAddress) setAddress(userAddress);
    };

    React.useEffect(() => {
        getAddress();
        getPhones();
    }, []);

    const handleSubmit = async (values: any, helpers: FormikHelpers<any>) => {
        await UsersAPI.updateUserAddress(currentUserId, {
            street: values.street,
            street2: values.street2,
            city: values.city,
            state: values.state,
            zipcode: values.zipcode,
        } as UserAddress).catch((err) => {
            dispatch(globalMessageActionCreators.addErrorMessage('Unable to update address'));
        });

        if (
            !!values.home &&
            values.home !== phones.find((p) => p.phoneType === PhoneType.Home)?.phoneNumber
        ) {
            await UsersAPI.updateUserPhone(currentUserId, PhoneType.Home, values.home);
        }
        if (
            !!values.mobile &&
            values.mobile !== phones.find((p) => p.phoneType === PhoneType.Mobile)?.phoneNumber
        ) {
            await UsersAPI.updateUserPhone(currentUserId, PhoneType.Mobile, values.mobile);
        }
        if (
            !!values.office &&
            values.office !== phones.find((p) => p.phoneType === PhoneType.Office)?.phoneNumber
        ) {
            await UsersAPI.updateUserPhone(currentUserId, PhoneType.Office, values.office);
        }

        history.push(nextRoute);
    };

    return (
        <>
            <h1>About You</h1>
            <p
                style={{
                    margin: '0 0 1rem',
                    lineHeight: '1.6',
                }}
            >
                <UserContactInformationSnippet />
            </p>
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        street: address?.street || '',
                        street2: address?.street2 || '',
                        city: address?.city || '',
                        state: address?.state || '',
                        zipcode: address?.zipcode || '',
                        home:
                            formatPhone(
                                phones.find((p) => p.phoneType === PhoneType.Home)?.phoneNumber || '',
                            ) || '',
                        mobile:
                            formatPhone(
                                phones.find((p) => p.phoneType === PhoneType.Mobile)?.phoneNumber || '',
                            ) || '',
                        office:
                            formatPhone(
                                phones.find((p) => p.phoneType === PhoneType.Office)?.phoneNumber || '',
                            ) || '',
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object().shape(
                        {
                            street: Yup.string().required('Street is required'),
                            city: Yup.string().required('City is required'),
                            state: Yup.string().required('State is required'),
                            zipcode: Yup.string().required('Zipcode is required'),
                            home: Yup.string().when('mobile', {
                                is: (val: string) => !val || val.length < 10,
                                then: Yup.string().required(
                                    'A home phone number is required if no mobile phone number is provided.',
                                ),
                                otherwise: Yup.string().notRequired(),
                            }),
                            mobile: Yup.string().when('home', {
                                is: (val: string) => !val || val.length < 10,
                                then: Yup.string().required(
                                    'A mobile phone number is required if no home phone number is provided.',
                                ),
                                otherwise: Yup.string().notRequired(),
                            }),
                        },
                        [['home', 'mobile']],
                    )}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form style={{ width: '100%', margin: '0.75rem 0 0' }}>
                            <div style={inputStyle}>
                                <FormInputs.Text
                                    id='street'
                                    name='street'
                                    label='Street'
                                    required
                                    fullWidth
                                    placeholder='Street / PO Box'
                                />
                            </div>
                            <div style={inputStyle}>
                                <FormInputs.Text
                                    id='street2'
                                    name='street2'
                                    label='Street2'
                                    fullWidth
                                    placeholder='Suite / Apartment'
                                />
                            </div>
                            <div style={inputStyle}>
                                <FormInputs.Text
                                    id='city'
                                    name='city'
                                    label='City'
                                    required
                                    fullWidth
                                    placeholder='City'
                                />
                            </div>
                            <div style={inputStyle}>
                                <FormInputs.Text
                                    id='state'
                                    name='state'
                                    label='State'
                                    required
                                    fullWidth
                                    placeholder='State'
                                />
                            </div>
                            <div
                                style={{
                                    ...inputStyle,
                                    marginBottom: '1rem',
                                }}
                            >
                                <div style={inputStyle}>
                                    <FormInputs.Text
                                        id='zipcode'
                                        name='zipcode'
                                        label='Zip'
                                        required
                                        fullWidth
                                        placeholder='Zipcode'
                                    />
                                </div>
                                <div style={inputStyle}>
                                    <FormInputs.Telephone
                                        id='home'
                                        name='home'
                                        label='Home Phone'
                                        fullWidth
                                    />
                                </div>
                                <div style={inputStyle}>
                                    <FormInputs.Telephone
                                        id='mobile'
                                        name='mobile'
                                        label='Mobile Phone'
                                        fullWidth
                                    />
                                </div>
                                <div style={inputStyle}>
                                    <FormInputs.Telephone
                                        id='office'
                                        name='office'
                                        label='Office Phone'
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <FormButtons.Submit
                                text='Update Contact Information'
                                disable={isSubmitting || !isValid}
                                fullWidth
                                withMarginTop
                            />
                            <WelcomeButtonLink link={`${nextRoute}`} display='Update Later' inverse />
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default ContactInformationPage;
