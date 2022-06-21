import SubscriptionAPI from 'API/Subscriptions/API';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useTasksFromTasksState from 'State/Tasks/Hooks/useTasksFromTasksState';
import UsersAPI from '../../../API/Users';
import { IconColors, Remove } from '../../../Icons';
import { Button } from '../../../Shared/Button';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { FormButtons, FormInputs } from '../../../Shared/Forms';
import { globalMessageActionCreators } from '../../../State';
import { currentUserId } from '../../../State/CurrentUser/selectors';
import { CommunicationChannel, SubscriptionPlanType } from '../../../State/Subscriptions/Types';
import { TasksActions, TasksActionTypes } from '../../../State/Tasks/actions';
import { SubscribeToAlertsTask } from '../../../State/Tasks/Types/SubscribeToAlertsTask';
import { PhoneType } from '../../../Types/User/PhoneType';
import { TELEPHONE_REGEXP } from '../../../utils/formatPhone';

const SubscribeToAlert: React.FC<{ task: SubscribeToAlertsTask }> = ({ task }): React.ReactElement => {
    const dispatch = useDispatch();

    const [showAction, setShowAction] = React.useState<boolean>(false);

    const userId: number = useSelector(currentUserId);

    const { dismissTask } = useTasksFromTasksState();

    const handleSubmit = async (mobilePhone: string) => {
        await UsersAPI.updateUserPhone(userId, PhoneType.Mobile, mobilePhone).catch((err) => {
            dispatch(globalMessageActionCreators.addErrorMessage(`Unable to update mobile phone`));

            throw new Error(err);
        });

        await SubscriptionAPI.createSubscription(SubscriptionPlanType.EmergencyAlerts, CommunicationChannel.SMS).catch(
            (err) => {
                dispatch(globalMessageActionCreators.addErrorMessage(`Unable to subscribe to Emergency Alerts`));

                throw new Error(err);
            },
        );

        dispatch(globalMessageActionCreators.addSuccessMessage(`You were subscribed to Emergency Alerts.`));

        dispatch({
            type: TasksActions.REMOVE_TASK,
            payload: {
                taskId: task.id,
            },
        } as TasksActionTypes);
    };

    return (
        <>
            <p style={{ fontSize: '1rem', margin: '-0.5rem 0 1.25rem', maxWidth: '45rem' }}>
                DashComm uses an emergency alert system to notify you if there is information critical to Shopping Center
                safety or well-being.
            </p>
            <Button callback={() => setShowAction(!showAction)} text="Update Subscription" />
            {showAction && (
                <div
                    style={{
                        margin: '1rem 0',
                        padding: '1rem',
                        border: `1px solid ${IconColors.OffWhite}`,
                        borderRadius: '0.25rem',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '1.15rem',
                            lineHeight: '1.15rem',
                            margin: '0 0 0.75rem',
                        }}
                    >
                        Opt-In
                    </h3>
                    <p
                        style={{
                            fontSize: '0.875rem',
                            color: IconColors.DarkGrey,
                            margin: '0 0 0.5rem',
                            lineHeight: '1.5rem',
                        }}
                    >
                        Verify your mobile number, check the box, and click &apos;Subscribe&apos; to receive critical safety
                        messages.
                    </p>
                    <p
                        style={{
                            fontSize: '0.875rem',
                            color: IconColors.DarkGrey,
                            margin: '0 0 1.5rem',
                            lineHeight: '1.5rem',
                        }}
                    >
                        For more information, visit your{' '}
                        <Link to="/account" style={{ color: IconColors.BrandBlue }}>
                            account
                        </Link>{' '}
                        page.
                    </p>
                    <Formik
                        validateOnMount
                        initialValues={{
                            mobilePhone: task.mobilePhone || '',
                            subscribeToAlerts: false,
                        }}
                        onSubmit={async (values) => handleSubmit(values.mobilePhone)}
                        validationSchema={Yup.object({
                            mobilePhone: Yup.string()
                                .required('A mobile device number is required')
                                .matches(new RegExp(TELEPHONE_REGEXP), 'Please enter a valid mobile phone number'),
                            subscribeToAlerts: Yup.boolean()
                                .required('You must check the box to subscribe')
                                .isTrue('You must check the box to subscribe.'),
                        })}
                    >
                        {({ isSubmitting, errors, isValid, isValidating }) => (
                            <Form style={{ maxWidth: '40rem' }}>
                                <FlexWrapper align="center" justify="between">
                                    <FormInputs.Telephone
                                        id="mobilePhone"
                                        name="mobilePhone"
                                        label="Mobile Phone"
                                        placeholder="Enter Mobile Phone"
                                        hideLabel
                                        fullWidth
                                    />
                                    <div style={{ marginLeft: '0.5rem' }}>
                                        <FormButtons.Submit
                                            text="Subscribe"
                                            disable={isSubmitting || !isValid || isValidating}
                                            inverse
                                        />
                                    </div>
                                </FlexWrapper>
                                <FlexWrapper
                                    align="center"
                                    justify="center"
                                    style={{
                                        margin: '0.5rem 0 0',
                                        padding: '1rem',
                                        width: '100%',
                                        backgroundColor: IconColors.OffWhite,
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
                                </FlexWrapper>
                                <button
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        marginTop: '0.5rem',
                                        cursor: 'pointer',
                                        backgroundColor: 'white',
                                    }}
                                    onClick={() => dismissTask(task)}
                                    type="button"
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Remove aspect="1rem" color={IconColors.DarkGrey} />
                                        <p style={{ color: IconColors.DarkGrey, marginLeft: '0.5rem' }}>
                                            No thanks, I don&apos;t have a mobile number
                                        </p>
                                    </div>
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </>
    );
};

export default SubscribeToAlert;
