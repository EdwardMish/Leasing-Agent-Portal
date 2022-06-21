import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import UsersAPI from '../../../../API/Users';
import { UserPhone } from '../../../../API/Users/UsersTypes/UserPhone';
import EmergrancyAlertsSnippet from '../../../../Data/Snippets/EmergrancyAlertsSnippet';
import { IconColors } from '../../../../Icons';
import { FormButtons, FormInputs, FormRow } from '../../../../Shared/Forms';
import { globalMessageActionCreators } from '../../../../State';
import { selectors } from '../../../../State/CurrentUser';
import { CommunicationChannel, SubscriptionPlanType } from '../../../../State/Subscriptions/Types';
import { PhoneType } from '../../../../Types/User/PhoneType';
import { formatPhone, TELEPHONE_REGEXP } from '../../../../utils/formatPhone';
import WelcomeButtonLink from '../WelcomeButtonLink';
import SubscriptionAPI from 'API/Subscriptions/API';
import styles = require('../welcome.module.css');
import { SubscriptionPlan } from 'API/Subscriptions/Types/SubscriptionPlan';
import { Subscription } from 'API/Subscriptions/Types/Subscription';

const EmergencyAlertsPage: React.FC<{ nextRoute: string }> = ({ nextRoute }): React.ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUserId: number = useSelector(selectors.currentUserId);

    const [userPhone, setUserPhone] = React.useState<string>('');
    const [subscribed, setSubscribed] = React.useState<boolean>(false);

    React.useEffect(() => {
        UsersAPI.getUserPhones(currentUserId).then((phones: UserPhone[]) => {
            const mobilePhone = phones.find((p: UserPhone) => p.phoneType === PhoneType.Mobile);

            if (mobilePhone) {
                setUserPhone(formatPhone(mobilePhone.phoneNumber) || '');
            }
        });

        SubscriptionAPI.getSubscriptions().then((subscriptionPlans: SubscriptionPlan[]) => {
            const subscribed = subscriptionPlans.find(
                (p: SubscriptionPlan) =>
                    p.subscriptionPlanType === SubscriptionPlanType.EmergencyAlerts &&
                    p.subscriptions.some((s: Subscription) => s.channel === CommunicationChannel.SMS),
            );

            setSubscribed(!!subscribed);
        });
    }, []);

    const handleSubmit = async (mobilePhone) => {
        await UsersAPI.updateUserPhone(currentUserId, PhoneType.Mobile, mobilePhone).catch((err) => {
            const errorMessage = 'We were not able to add your mobile number';

            dispatch(globalMessageActionCreators.addErrorMessage(errorMessage));

            throw new Error(errorMessage);
        });

        await SubscriptionAPI.createSubscription(SubscriptionPlanType.EmergencyAlerts, CommunicationChannel.SMS).catch(
            (err) => {
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to subscribe to alert system'));

                throw new Error(err);
            },
        );

        dispatch(globalMessageActionCreators.addSuccessMessage('You were subscribed to Emergency Alerts.'));

        history.push(nextRoute);
    };

    return (
        <>
            <h1>Emergency Alerts</h1>
            <p className={styles.WelcomeParagraphBlock}>
                <EmergrancyAlertsSnippet />
            </p>
            {subscribed && (
                <>
                    <h2>You are already subscribed!</h2>
                    <p>To manage your subscription, please visit your Account page.</p>
                </>
            )}
            {!subscribed && (
                <div>
                    <p
                        style={{
                            margin: '0 0 1rem',
                            lineHeight: '1.6',
                        }}
                    >
                        {`To subscribe to emergency alerts, ${userPhone.length ? 'verify' : 'enter'} your mobile number:`}
                    </p>
                    <Formik
                        enableReinitialize
                        validateOnMount
                        initialValues={{
                            mobilePhone: userPhone,
                            subscribeToAlerts: false,
                        }}
                        onSubmit={(values) => handleSubmit(values.mobilePhone)}
                        validationSchema={Yup.object({
                            mobilePhone: Yup.string()
                                .required('A mobile device number is required')
                                .matches(new RegExp(TELEPHONE_REGEXP), 'Please enter a valid mobile phone number'),
                            subscribeToAlerts: Yup.boolean()
                                .required('You must check the box to subscribe')
                                .isTrue('You must check the box to subscribe.'),
                        })}
                    >
                        {({ isSubmitting, isValidating, isValid }) => (
                            <Form>
                                <FormRow>
                                    <FormInputs.Telephone
                                        id="mobilePhone"
                                        name="mobilePhone"
                                        label="Mobile Device"
                                        placeholder="(555) 555-5555"
                                        required
                                        fullWidth
                                    />
                                </FormRow>
                                <div
                                    style={{
                                        margin: '0 0 1rem',
                                        padding: '1rem',
                                        border: `1px solid ${IconColors.LightGrey}`,
                                        backgroundColor: IconColors.OffWhite,
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <FormInputs.CheckBox
                                        id="subscribeToAlerts"
                                        name="subscribeToAlerts"
                                        display="Subscribe to Emergency Alerts"
                                        required
                                    />
                                </div>
                                <FormButtons.Submit
                                    text="Subscribe"
                                    disable={isSubmitting || !isValid || isValidating}
                                    fullWidth
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
            <WelcomeButtonLink link={`${nextRoute}`} display={subscribed ? 'Continue' : 'Skip For Now'} inverse />
        </>
    );
};

export default EmergencyAlertsPage;

