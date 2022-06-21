import * as React from 'react';
import * as Yup from 'yup';

import { AxiosError } from 'axios';
import { Form, Formik, FieldInputProps } from 'formik';
import { useDispatch } from 'react-redux';

import { UsersAPI, Business as BusinessAPI } from '../../../../../API';
import { Business, globalMessageActionCreators } from '../../../../../State';

import { AnimatedIcons, IconColors } from '../../../../../Icons';

import { FormButtons, FormInputs, FormRow } from '../../../../../Shared/Forms';

import { Button } from '../../../../../Shared/Button';
import { ButtonRow } from '../../../../../Shared/ButtonRow';
import { FlexWrapper } from '../../../../../Shared/FlexWrapper';

interface CreateUserModalProps {
    occupantId: number | string;
    occupantName: string;
    closeCallback: () => void;
}

interface BaseUser {
    firstName: string;
    lastName: string;
    email: string;
}

const baseUser: BaseUser = {
    firstName: '',
    lastName: '',
    email: '',
};

export const CreateUserModal: React.FC<CreateUserModalProps> = ({ occupantId, occupantName, closeCallback }) => {
    const dispatch = useDispatch();

    const [errorState, setErrorState] = React.useState<
        { message: string; secondaryMessage: string; hasError: boolean } | undefined
    >();
    const [pendingAction, togglePendingAction] = React.useState<boolean>(false);
    const [userToInvite, setUserToInvite] = React.useState<UsersAPI.TenantUser | undefined>();

    const checkUserEmail = (email): Promise<UsersAPI.TenantUser | null> => UsersAPI.getUserByEmail(email).then((res) => res);

    const reset = (formReset) => {
        setErrorState(undefined);
        togglePendingAction(false);
        setUserToInvite(undefined);

        formReset(baseUser as any);
    };

    const reloadUsers = (): Promise<void> =>
        BusinessAPI.API.getBusinessUsers(occupantId)
            .then((users) => {
                dispatch({
                    type: Business.Actions.SET_BUSINESS_USERS_FOR_OCCUPANT,
                    payload: {
                        occupantId,
                        users: users.map((u: BusinessAPI.Types.BusinessUser) =>
                            Business.Mappers.mapBusinessAPIUserToUser(u),
                        ),
                    },
                } as Business.ActionTypes);

                setErrorState(undefined);
                togglePendingAction(false);
                setUserToInvite(undefined);

                closeCallback();
            })
            .catch(() => {});

    const createUser = ({ firstName, lastName, email }) => {
        togglePendingAction(true);

        UsersAPI.createTenant(occupantId, firstName, lastName, email)
            .then(() => {
                reloadUsers();
            })
            .catch((err: AxiosError) => {
                togglePendingAction(false);

                setErrorState({
                    message: `We were not able to create a user account for ${firstName} ${lastName}`,
                    secondaryMessage: err?.response?.data[0].error || 'Unknown error from server.',
                    hasError: true,
                });
            });
    };

    const inviteUser = () => {
        if (!!userToInvite && userToInvite.hasOwnProperty('id')) {
            togglePendingAction(true);

            UsersAPI.inviteUserToOccupant({ occupantId, userId: userToInvite.id })
                .then(() => {
                    dispatch(
                        globalMessageActionCreators.addSuccessMessage(
                            `${userToInvite.firstName} ${userToInvite.lastName} has been invited.`,
                        ),
                    );

                    reloadUsers();
                })
                .catch((err: AxiosError) => {
                    togglePendingAction(false);

                    setErrorState({
                        message: `We were not able to invite ${userToInvite.email}.`,
                        secondaryMessage: err?.response?.data[0].error || 'Unknown error from server.',
                        hasError: true,
                    });
                });
        }
    };

    const handleSubmit = async ({ firstName, lastName, email }): Promise<void> => {
        const isUsed: UsersAPI.TenantUser | null = await checkUserEmail(email);

        if (!!isUsed && isUsed.hasOwnProperty('id')) {
            setUserToInvite(isUsed);

            return;
        }

        createUser({ firstName, lastName, email });
    };

    const verifyEmailOnBlur = async (field: FieldInputProps<any>, e: React.FormEvent<HTMLInputElement>): Promise<void> => {
        const { name, value } = field;

        if (name === 'email') {
            const isUsed: UsersAPI.TenantUser | null = await checkUserEmail(value);

            !!isUsed && isUsed.hasOwnProperty('id') ? setUserToInvite(isUsed) : setUserToInvite(undefined);
        }
    };

    return (
        <>
            <Formik
                initialValues={baseUser}
                onSubmit={handleSubmit}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('A First Name is required'),
                    lastName: Yup.string().required('A Last Name is required'),
                    email: Yup.string().email('A valid email is required').required('An Email is required'),
                })}
            >
                {({ resetForm }) => (
                    <>
                        {!!errorState && !!errorState.hasError ? (
                            <>
                                <div
                                    style={{
                                        margin: '0 0 1rem',
                                        padding: '0.75rem',
                                        backgroundColor: IconColors.WarningRedSecondary,
                                        border: `1px solid ${IconColors.WarningRed}`,
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: '0',
                                            lineHeight: '1.5rem',
                                            color: IconColors.WarningRed,
                                        }}
                                    >
                                        <b>{errorState.message}</b>
                                    </p>
                                    <p
                                        style={{
                                            margin: '0',
                                            lineHeight: '1.5rem',
                                            color: IconColors.WarningRed,
                                        }}
                                    >
                                        {errorState.secondaryMessage}
                                    </p>
                                </div>
                                <ButtonRow>
                                    <Button
                                        text="Cancel"
                                        callback={() => {
                                            reset(resetForm);
                                            closeCallback();
                                        }}
                                        inverse
                                    />
                                    <Button
                                        text="Try Again"
                                        callback={() => {
                                            reset(resetForm);
                                        }}
                                    />
                                </ButtonRow>
                            </>
                        ) : (
                            <Form>
                                <FormRow>
                                    <FormInputs.Text
                                        id="email"
                                        name="email"
                                        label="Email"
                                        onBlur={verifyEmailOnBlur}
                                        required
                                        fullWidth
                                        hideLabel
                                    />
                                </FormRow>
                                {!userToInvite && (
                                    <>
                                        <FormRow>
                                            <FormInputs.Text
                                                id="firstName"
                                                name="firstName"
                                                label="First Name"
                                                required
                                                fullWidth
                                                hideLabel
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <FormInputs.Text
                                                id="lastName"
                                                name="lastName"
                                                label="Last Name"
                                                required
                                                fullWidth
                                                hideLabel
                                            />
                                        </FormRow>
                                    </>
                                )}
                                {!pendingAction ? (
                                    <>
                                        {userToInvite ? (
                                            <>
                                                <div
                                                    style={{
                                                        padding: '0.75rem',
                                                        backgroundColor: IconColors.WarningRedSecondary,
                                                        border: `1px solid ${IconColors.WarningRed}`,
                                                        borderRadius: '0.25rem',
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            margin: '0',
                                                            lineHeight: '1.5rem',
                                                            color: IconColors.WarningRed,
                                                        }}
                                                    >
                                                        <b>A user already exists with that email</b>
                                                    </p>
                                                    <p
                                                        style={{
                                                            margin: '0',
                                                            lineHeight: '1.5rem',
                                                            color: IconColors.WarningRed,
                                                        }}
                                                    >{`Would you like to invite ${userToInvite.email} to your business?`}</p>
                                                </div>
                                                <Button
                                                    text={`Invite to ${occupantName}`}
                                                    callback={inviteUser}
                                                    withMarginTop
                                                    fullWidth
                                                />
                                            </>
                                        ) : (
                                            <FormButtons.Submit text="Create User" fullWidth />
                                        )}
                                    </>
                                ) : (
                                    <FlexWrapper align="center" justify="center" style={{ padding: '1rem' }}>
                                        <AnimatedIcons.SpinningLoader aspect="2rem" />
                                    </FlexWrapper>
                                )}
                            </Form>
                        )}
                    </>
                )}
            </Formik>
        </>
    );
};
