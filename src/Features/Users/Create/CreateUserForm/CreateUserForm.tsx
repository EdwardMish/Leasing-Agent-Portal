import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { createOwnerOperator, createOwnerOperatorAdmin, createTenantWithOccupants } from '../../../../API/User';
import { UserActions, Shared } from '../../../../State';
import { addErrorMessage } from '../../../../State/GlobalMessages/actionCreators';
import { UserTypes } from '../../../../Types';

import { Text, Email } from '../../../../Shared/Forms/Input';
import { Button } from '../../../../Shared/Button';

import { TypeSelect } from '../../TypeSelect';
import { OwnerOperatorAdminView, OwnerOperatorView, TenantView } from '../../UserViews';

const userFormStyles = require('../../UserForm/user-form.module.css');
const createUserStyles = require('../create-user.module.css');

export const CreateUserForm: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [userType, setUserType] = React.useState<UserTypes>();

    const [userRoles, setUserRoles] = React.useState<Shared.Types.Role[]>([]);
    const [associations, setAssociations] = React.useState<number[]>([]);

    React.useEffect(() => {
        setUserRoles([]);
        setAssociations([]);
    }, [userType]);

    const handleAssociations = (ids: number[]): void => {
        setAssociations(ids);
    };

    const currentUserTypeForm = () => {
        switch (userType) {
            case UserTypes.OWNER_OPERATOR_ADMIN:
                return <OwnerOperatorAdminView />;
            case UserTypes.OwnerOperator:
                return (
                    <OwnerOperatorView
                        setUserRoles={setUserRoles}
                        selectedRoles={userRoles}
                        setProperties={handleAssociations}
                    />
                );
            case UserTypes.Tenant:
                return <TenantView setTenants={handleAssociations} />;
            default:
                return null;
        }
    };

    const createUser = (values) => {
        if (!userType) {
            dispatch(addErrorMessage('You must select a user type.'));
        }

        switch (userType) {
            case UserTypes.OWNER_OPERATOR_ADMIN:
                submitOOA(values);
                break;
            case UserTypes.OwnerOperator:
                submitOO(values);
                break;
            case UserTypes.Tenant:
                submitTenant(values);
                break;
        }
    };

    const formatErrorMessage = (error): string => {
        const errorResponse = error?.error ?? error;

        return errorResponse.Message ?? errorResponse[0]?.error ?? 'There was an error creating the user.';
    };

    const submitOOA = (values) => {
        const user = {
            Email: values.email,
            FirstName: values.firstName,
            LastName: values.lastName,
        };

        createOwnerOperatorAdmin(user)
            .then((response) => {
                resetUsersOnSuccess(response);
            })
            .catch((err) => {
                dispatch(addErrorMessage(formatErrorMessage(err)));
            });
    };

    const submitOO = (values) => {
        const user = {
            FirstName: values.firstName,
            LastName: values.lastName,
            Email: values.email,
            Roles: userRoles.map(({ id }) => id),
            PropertyIds: associations,
        };

        createOwnerOperator(user)
            .then((response) => {
                resetUsersOnSuccess(response);
            })
            .catch((err) => {
                dispatch(addErrorMessage(formatErrorMessage(err)));
            });
    };

    const submitTenant = (values) => {
        createTenantWithOccupants({
            ...values,
            occupantIds: associations,
        })
            .then((response) => {
                resetUsersOnSuccess(response);
            })
            .catch((err) => {
                dispatch(addErrorMessage(formatErrorMessage(err)));
            });
    };

    const resetUsersOnSuccess = (response: { userId: number } | undefined) => {
        dispatch({
            type: UserActions.REFRESH_USERS,
        });

        if (response && response.hasOwnProperty('userId')) {
            history.push(`/users/details/${response.userId}`);
        } else {
            history.push('/users');
        }
    };

    const createUserSchema = Yup.object().shape({
        firstName: Yup.string().min(3, 'First name is too short').max(50, 'First name is too large').required('Required'),
        lastName: Yup.string().min(3, 'Last name is too short').max(50, 'Last name is too large').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const invalidUserRoles = userType === UserTypes.OwnerOperator && userRoles.length === 0;
    const invalidUserProperties = userType === UserTypes.OwnerOperator && associations.length === 0;

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            validationSchema={createUserSchema}
            onSubmit={(values, { setSubmitting }) => {
                createUser(values);
                setSubmitting(false);
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Form>
                    <div className={`${userFormStyles.UserForm} ${createUserStyles.flexColumn}`}>
                        <TypeSelect
                            handler={(type: UserTypes) => {
                                setUserType(type);
                            }}
                        />
                        <Email required label="Email" id="email" name="email" />
                        <div className={createUserStyles.flexRow} style={{ justifyContent: 'space-between' }}>
                            <div className={createUserStyles.inputText}>
                                <Text required label="First Name" id="firstName" name="firstName" fullWidth />
                            </div>
                            <div className={createUserStyles.inputText}>
                                <Text required label="Last Name" id="lastName" name="lastName" fullWidth />
                            </div>
                        </div>

                        <div className={userFormStyles.UserFormBlock}>{currentUserTypeForm()}</div>
                        <Button
                            text={isSubmitting ? 'Creating User' : 'Create User'}
                            disable={invalidUserRoles || invalidUserProperties || !isValid || isSubmitting}
                            type="submit"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

