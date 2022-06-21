import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SubscriptionAPI from 'API/Subscriptions/API';
import UsersAPI from '../../../../API/Users';
import { IconColors } from '../../../../Icons';
import { Button } from '../../../../Shared/Button';
import { ButtonRow } from '../../../../Shared/ButtonRow';
import { FormButtons, FormInputs } from '../../../../Shared/Forms';
// import { Subscription, SubscriptionPlan } from "../../../../API/Subscriptions/Types";
import { globalMessageActionCreators } from '../../../../State';
import { selectors } from '../../../../State/CurrentUser';
import { CommunicationChannel, SubscriptionPlanType } from '../../../../State/Subscriptions/Types';
import { PhoneType } from '../../../../Types/User';
import { TELEPHONE_REGEXP } from '../../../../utils/formatPhone';

interface CalloutSubscribeProps {
    currentPhone: string;
    hideCallback: () => void;
    refreshCallback: () => void;
    refreshPhones: () => void;
}

const CalloutSubscribe: React.FC<CalloutSubscribeProps> = ({
    currentPhone,
    hideCallback,
    refreshCallback,
    refreshPhones,
}) => {
    const dispatch = useDispatch();

    const userId: number = useSelector(selectors.currentUserId);

    const handleSubmit = async (values) => {
        if (currentPhone !== values.mobilePhone) {
            await UsersAPI.updateUserPhone(userId, PhoneType.Mobile, values.mobilePhone).catch((err) => {
                dispatch(globalMessageActionCreators.addErrorMessage(`Unable to update mobile phone`));

                throw new Error(err);
            });

            refreshPhones();
        }

        await SubscriptionAPI.createSubscription(SubscriptionPlanType.EmergencyAlerts, CommunicationChannel.SMS).catch(
            (err) => {
                dispatch(globalMessageActionCreators.addErrorMessage(`Unable to subscribe to Emergency Alerts`));

                throw new Error(err);
            },
        );

        refreshCallback();
    };

    return (
        <div style={{ margin: '1rem 0' }}>
            <h3
                style={{
                    color: IconColors.WarningRed,
                    margin: '0 0 0.5rem',
                }}
            >
                Emergency Alerts
            </h3>
            <p
                style={{
                    fontSize: '0.875rem',
                    color: IconColors.DarkGrey,
                    margin: '0 0 1rem',
                    lineHeight: '1.5rem',
                }}
            >
                When there is information critical to Shopping Center safety or well-being, DashComm uses an emergency alert
                system to notify all registered text-message capable phones and email addresses.
            </p>
            <p
                style={{
                    fontSize: '0.875rem',
                    color: IconColors.DarkGrey,
                    margin: '0 0 1.5rem',
                    lineHeight: '1.5rem',
                }}
            >
                To opt into Phillips Edison &amp; Company&apos;s Emergency Alert System, verify your mobile number, check the
                below box agreeing to receive critical safety messages, and click &apos;Subscribe&apos;.
            </p>
            <Formik
                initialValues={{
                    mobilePhone: currentPhone,
                    subscribeToAlerts: false,
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object({
                    mobilePhone: Yup.string()
                        .required('A mobile device number is required')
                        .matches(new RegExp(TELEPHONE_REGEXP), 'Please enter a valid mobile phone number'),
                    subscribeToAlerts: Yup.boolean()
                        .required('You must check the box to subscribe')
                        .isTrue('You must check the box to subscribe.'),
                })}
            >
                {({ isSubmitting, values, errors, isValid, isValidating }) => (
                    <Form>
                        <FormInputs.Telephone
                            id="mobilePhone"
                            name="mobilePhone"
                            label="Mobile Phone"
                            fullWidth
                            placeholder="Enter Mobile Phone"
                        />
                        <div
                            style={{
                                margin: '1rem 0',
                                padding: '1rem',
                                border: `1px solid ${IconColors.LightGrey}`,
                                backgroundColor: IconColors.OffWhite,
                                borderRadius: '0.25rem',
                            }}
                        >
                            {!errors.mobilePhone ? (
                                <FormInputs.CheckBox
                                    id="subscribeToAlerts"
                                    name="subscribeToAlerts"
                                    display="Subscribe to Emergency Alerts"
                                    required
                                />
                            ) : (
                                <p>Enter your mobile number to receive alerts.</p>
                            )}
                        </div>
                        <ButtonRow withMarginBottom>
                            <Button
                                callback={hideCallback}
                                text="Not Now"
                                inverse
                                style={{
                                    marginRight: '0.5rem',
                                }}
                            />
                            <FormButtons.Submit
                                text="Subscribe"
                                disable={isSubmitting || !isValid || isValidating || !values.subscribeToAlerts}
                            />
                        </ButtonRow>
                    </Form>
                )}
            </Formik>
            <p
                style={{
                    fontSize: '0.8rem',
                    color: IconColors.DarkGrey,
                    fontStyle: 'italic',
                    margin: '0 0 0.5rem',
                    lineHeight: '1.25rem',
                }}
            >
                Personal information is kept secure and private.
            </p>
            <p
                style={{
                    fontSize: '0.8rem',
                    color: IconColors.DarkGrey,
                    fontStyle: 'italic',
                    margin: '0 0 1rem',
                    lineHeight: '1.25rem',
                }}
            >
                The service is free, but message and data rates may apply depending on your phone provider.
            </p>
        </div>
    );
};

export default CalloutSubscribe;
