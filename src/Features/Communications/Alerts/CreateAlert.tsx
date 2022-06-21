import { PropertyAPI, PropertyTypes } from 'API/Property';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import * as Yup from 'yup';
import API from '../../../API/Alerts';
import { AnimatedIcons, IconColors } from '../../../Icons';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { FormButtons, FormRow, TextArea } from '../../../Shared/Forms';
import { Hidden } from '../../../Shared/Forms/Input';
import { DropDownSelector, useSinglePropertySelection } from '../../../Shared/PropertyTenantResolution';
import { globalMessageActionCreators } from '../../../State';
import { PropertyWithOccupants } from '../../../State/Shared/Types';

const formatCityStateString = (address: PropertyTypes.PropertyAddress, prepend: string): string => {
    if (!address) return prepend;

    const { city = '', state = '' } = address;

    if (!!city.length && !!state.length) return `${prepend}${city}, ${state}`;
    if (city.length) return `${prepend}${city}`;
    if (state.length) return `${prepend}${state}`;
    return prepend;
};

const CreateAlert: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [
        availableProperties,
        selectedPropertyId,
        visibleProperties,
        selectProperty,
        searchProperties,
        propertiesAreLoaded,
    ] = useSinglePropertySelection();

    const [alertInput, setAlertInput] = React.useState<string>('');
    const [pendingSend, togglePendingSend] = React.useState<boolean>(false);
    const [showModal, toggleShowModal] = React.useState<boolean>(false);
    const [inputCharacterCount, setInputCharacterCount] = React.useState<number>(0);
    const [textAreaEnabled, setTextAreaEnabled] = React.useState<boolean>(false);

    const promptAlert = ({ alert }) => {
        setAlertInput(alert);
        toggleShowModal(true);
    };

    const handleSend = async () => {
        if (selectedPropertyId > 0) {
            togglePendingSend(true);

            await API.createAlert(selectedPropertyId, alertInput);

            togglePendingSend(false);
            toggleShowModal(false);

            dispatch(globalMessageActionCreators.addSuccessMessage('Emergency Alert Sent.'));

            history.push('/communications/alerts');
        }
    };

    const handlePropertySearch = (searchInput: string): void => {
        searchProperties(searchInput);
    };

    const handlePropertySelection = async (
        propertyId: number,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        values,
    ) => {
        const userInput: string = values.alert.split(':')[2] || '';

        setTextAreaEnabled(false);

        selectProperty(propertyId);

        if (propertyId > 0) {
            const address: PropertyTypes.PropertyAddress = await PropertyAPI.getAddress(propertyId);

            const property = availableProperties.find((p: PropertyWithOccupants) => p.id === propertyId);

            let full: string;

            if (property) full = `${formatCityStateString(address, `${property.name} - `)}:${userInput}`;
            else full = `${formatCityStateString(address, '')}:${userInput}`;

            setTextAreaEnabled(true);
            setFieldValue('propertyId', propertyId);
            setFieldValue('alert', `PECO ALERT SYSTEM: ${full}`);
        }
    };

    const handleChange = (element, { target }) => {
        const characterCount: number = target.value.length;

        setInputCharacterCount(characterCount);
    };

    return (
        <>
            <div
                style={{
                    padding: '0 0 0 1rem',
                    borderLeft: `5px solid ${IconColors.WarningRed}`,
                }}
            >
                <p
                    style={{
                        lineHeight: '1.6',
                        margin: '0 0 1rem',
                    }}
                >
                    Before sending this Emergency Alert, please verify this is an immediate emergency that poses danger to
                    Neighbors in this Shopping Center. This may include an active shooter onsite, a weather emergency posing
                    immediate threat, fire and flooding in the building.
                </p>
            </div>
            <div
                style={{
                    padding: '0 0 0 1rem',
                    borderLeft: `5px solid ${IconColors.WarningRed}`,
                }}
            >
                <p
                    style={{
                        lineHeight: '1.6',
                        margin: '0 0 1rem',
                    }}
                >
                    Any abuse of the Emergency Alert System could result in fines from the FCC and/or loss of subscribed SMS
                    Alert Users.
                </p>
            </div>
            <div
                style={{
                    padding: '0 0 0 1rem',
                    borderLeft: `5px solid ${IconColors.WarningRed}`,
                }}
            >
                <p
                    style={{
                        lineHeight: '1.6',
                        margin: '0 0 2rem',
                    }}
                >
                    Any character count over 160 will result in your message being separated into multiple messages. Please
                    keep the message short and to the point to minimize the number of messages sent.
                </p>
            </div>
            <Formik
                initialValues={{
                    alert: 'Please select a Property.',
                    propertyId: selectedPropertyId,
                }}
                validationSchema={Yup.object({
                    alert: Yup.string().required('You must enter alert text.'),
                    propertyId: Yup.number().required('You must select a Property.'),
                })}
                onSubmit={promptAlert}
            >
                {({ isValid, setFieldValue, values }) => (
                    <Form>
                        <FormRow withMargin>
                            <p style={{ fontWeight: 700, margin: '0 0 0.5rem' }}>Select a Property:</p>
                            <DropDownSelector
                                availableOptions={availableProperties}
                                selectedOptionId={selectedPropertyId}
                                visibleOptions={visibleProperties}
                                searchHandler={handlePropertySearch}
                                selectOptionHandler={(propertyId: number) => {
                                    handlePropertySelection(propertyId, setFieldValue, values);
                                }}
                                loaded={propertiesAreLoaded}
                            />
                            <Hidden id="propertyId" name="propertyId" label="Property" required />
                            <TextArea
                                id="alert"
                                name="alert"
                                label="Alert"
                                required
                                disabled={!textAreaEnabled}
                                onChange={handleChange}
                            />
                            <p
                                style={{
                                    margin: '0.5rem 0 0',
                                    fontStyle: 'italic',
                                    color: IconColors.LightGrey,
                                }}
                            >
                                {`Character Count: ${inputCharacterCount}/160`}
                            </p>
                        </FormRow>
                        <FormButtons.Submit
                            text="Send Emergency Alert"
                            disable={pendingSend || selectedPropertyId < 1 || !isValid}
                        />
                    </Form>
                )}
            </Formik>
            {showModal && (
                <ModalWithAction
                    header="Verify Emergency Alert"
                    actionText="Confirm"
                    actionCallback={handleSend}
                    cancelCallback={() => toggleShowModal(false)}
                    disable={pendingSend}
                >
                    <div
                        style={{
                            padding: '1rem',
                            maxWidth: '40rem',
                        }}
                    >
                        {pendingSend ? (
                            <FlexWrapper
                                align="center"
                                justify="center"
                                style={{
                                    minHeight: '8rem',
                                    width: '100%',
                                }}
                            >
                                <AnimatedIcons.SpinningLoader aspect="2.5rem" />
                                <p
                                    style={{
                                        color: IconColors.BrandBlue,
                                        fontWeight: 700,
                                        marginLeft: '0.45rem',
                                    }}
                                >
                                    Sending...
                                </p>
                            </FlexWrapper>
                        ) : (
                            <>
                                <p
                                    style={{
                                        margin: '0 0 1rem',
                                        color: IconColors.WarningRed,
                                    }}
                                >
                                    <b>Are you sure you want to send?</b>
                                </p>
                                <p style={{ margin: '0 0 1rem' }}>
                                    Please verify this is an immediate emergency that requires use of the Emergency Alert
                                    System.
                                </p>
                                <div
                                    style={{
                                        margin: '2rem',
                                    }}
                                >
                                    <p style={{ fontWeight: 700, margin: '0 0 0.5rem' }}>Message to Send:</p>
                                    <p
                                        style={{
                                            padding: '1rem',
                                            border: `1px solid ${IconColors.DarkGrey}`,
                                            backgroundColor: IconColors.OffWhite,
                                            borderRadius: '0.25rem',
                                            lineHeight: '1.4',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {alertInput}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </ModalWithAction>
            )}
        </>
    );
};

export default CreateAlert;

