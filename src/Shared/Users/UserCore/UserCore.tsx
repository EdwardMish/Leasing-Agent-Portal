import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { UserAPI } from '../../../API';
import { UserActions, UserActionTypes } from '../../../State';
import { User } from '../../../Types';

import { addErrorMessage } from '../../../State/GlobalMessages/actionCreators';

import { Close, Edit } from '../../../Icons';

import { FormButtons, FormInputs, FormRow } from '../../Forms';
import { SecondaryTitleWithAction } from '../../PageElements';

const styles = require('../Details/user-details.module.css');

interface UserCoreProps {
    user: User;
}

export const UserCore: React.FC<UserCoreProps> = ({ user }) => {
    const dispatch = useDispatch();

    const { id, firstName, lastName } = user;

    const [editing, toggleEdit] = React.useState<boolean>(false);

    const closeAction = { callBack: () => toggleEdit(false) };
    const openAction = { callBack: () => toggleEdit(true) };

    const editUserCore = (values: { firstName: string; lastName: string }) => {
        if (values.firstName !== firstName || values.lastName !== lastName) {
            UserAPI.updateName(id, values.firstName, values.lastName)
                .then(() => {
                    dispatch({
                        type: UserActions.UPDATE_NAME,
                        payload: {
                            userId: id,
                            firstName: values.firstName,
                            lastName: values.lastName,
                        },
                    } as UserActionTypes);

                    toggleEdit(false);
                })
                .catch((error) => dispatch(addErrorMessage(error?.message || "Unable to update User's name")));
        }
    };

    return (
        <div className={styles.UserDetailsCore}>
            {editing ? (
                <>
                    <SecondaryTitleWithAction title="Edit User" action={closeAction} ActionIcon={Close} />
                    <Formik
                        initialValues={{
                            firstName,
                            lastName,
                        }}
                        onSubmit={(values) => {
                            editUserCore(values);
                        }}
                        validationSchema={Yup.object({
                            firstName: Yup.string().required('A first name is required'),
                            lastName: Yup.string().required('A last name is required'),
                        })}
                    >
                        {({ isSubmitting }) => (
                            <Form style={{ width: '100%' }}>
                                <FormRow>
                                    <FormInputs.Text
                                        id=""
                                        name="firstName"
                                        label="First Name"
                                        required
                                        fullWidth
                                        hideLabel
                                    />
                                </FormRow>
                                <FormRow>
                                    <FormInputs.Text id="" name="lastName" label="Last Name" required fullWidth hideLabel />
                                </FormRow>
                                <FormRow>
                                    <FormButtons.Submit text="Update User" disable={isSubmitting} />
                                </FormRow>
                            </Form>
                        )}
                    </Formik>
                </>
            ) : (
                <>
                    <SecondaryTitleWithAction
                        title={`${user.firstName} ${user.lastName}`}
                        action={openAction}
                        ActionIcon={Edit}
                    />
                    <div className={styles.UserDetailsEmail}>
                        <p>{user.email}</p>
                        <p>{`User Type: ${user.userTypeDisplay}`}</p>
                    </div>
                </>
            )}
        </div>
    );
};
