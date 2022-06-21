import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { UsersAPI } from '../../../API';

import { FormButtons, FormInputs, FormRow } from '../../../Shared/Forms';
import { Button } from '../../../Shared/Button';

import { globalMessageActionCreators, Welcome } from '../../../State';

import { TenantRoleNames } from './TenantRoleNames';

import WelcomeButtonLink from './WelcomeButtonLink';

const styles = require('./welcome.module.css');

const CreateUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { firstOccupantToSetup } = Welcome.Hooks.useOccupantsFromWelcomeState();

    const { feature } = useParams<{ feature: string }>();

    const [showSendInviteButton, toggleShowInviteButton] = React.useState<boolean>(false);
    const [userToInvite, setUserToInvite] = React.useState<UsersAPI.TenantUser | null>();

    const handleSubmit = ({ firstName, lastName, email }) => {
        UsersAPI.getUserByEmail(email).then((res) => {
            if (res) {
                toggleShowInviteButton(true);
                setUserToInvite(res);
            } else {
                UsersAPI.createTenant(firstOccupantToSetup.id, firstName, lastName, email)
                    .then(({ userId }) => {
                        dispatch({
                            type: Welcome.Actions.ADD_OCCUPANT_USER,
                            payload: {
                                id: firstOccupantToSetup.id,
                                user: {
                                    id: userId,
                                    firstName,
                                    lastName,
                                    email,
                                    enabled: true,
                                    permissions: [],
                                    roles: [{ id: 1, name: TenantRoleNames.Basic }],
                                },
                            },
                        } as Welcome.ActionTypes);

                        // TODO: Implement in another way when flow is codified
                        feature.includes('requests')
                            ? history.push(`/app/welcome/users/${feature}`)
                            : history.push(`/app/welcome/users/${feature}/add-users`);
                    })
                    .catch((err: AxiosError) => {
                        dispatch(
                            globalMessageActionCreators.addErrorMessage(
                                `Unable to create user - ${err?.response?.data[0].error || ''}`,
                            ),
                        );
                    });
            }
        });
    };

    const inviteUserToOccupant = () => {
        if (!userToInvite) return;
        UsersAPI.inviteUserToOccupant({
            userId: userToInvite.id,
            occupantId: firstOccupantToSetup.id,
        })
            .then((user) => {
                dispatch(globalMessageActionCreators.addSuccessMessage('User has been invited'));
                dispatch({
                    type: Welcome.Actions.ADD_OCCUPANT_USER,
                    payload: {
                        id: firstOccupantToSetup.id,
                        user: {
                            id: userToInvite.id,
                            firstName: userToInvite.firstName,
                            lastName: userToInvite.lastName,
                            email: userToInvite.email,
                            enabled: true,
                            permissions: [],
                            roles: [{ id: 1, name: TenantRoleNames.Basic }],
                        },
                    },
                } as Welcome.ActionTypes);
                history.push(`/app/welcome/users/${feature}/add-users`);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to invite user'));
            });
    };

    return (
        <>
            <h1>New User</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('A First Name is required'),
                    lastName: Yup.string().required('A Last Name is required'),
                    email: Yup.string().required('An Email is required'),
                })}
            >
                {({ isSubmitting }) => (
                    <Form>
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
                        <FormRow>
                            <FormInputs.Text
                                id="email"
                                name="email"
                                label="Email"
                                required
                                fullWidth
                                hideLabel
                            />
                        </FormRow>
                        <FormButtons.Submit text="Create User" disable={isSubmitting} fullWidth />
                    </Form>
                )}
            </Formik>
            <WelcomeButtonLink display="Cancel" link={`/app/welcome/users/${feature}/add-users`} inverse />
            {showSendInviteButton && userToInvite ? (
                <div className={styles.inviteUser}>
                    <p>
                        A user already exists with that email, would you like to invite
                        {' '}
                        {userToInvite.email}
                        {' '}
                        to your business?
                    </p>
                    <Button text={`Invite to ${firstOccupantToSetup.name}`} callback={inviteUserToOccupant} />
                </div>
            ) : null}
        </>
    );
};

export default CreateUser;
