import { RequestsAPI, RequestsTypes } from 'API/Requests';
import { Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { FilterColumn, PagedSortedFilteredRequestParams } from '../../../../../API/Shared/PagedSortedFilteredRequest';
import { MagnifyingGlass } from '../../../../../Icons';
import { Button } from '../../../../../Shared/Button';
import { FlexWrapper } from '../../../../../Shared/FlexWrapper';
import { FormInputs, FormRow } from '../../../../../Shared/Forms';
import { LoadingContent, NoContent } from '../../../../../Shared/PageElements';
import { ScrollWrapper } from '../../../../../Shared/ScrollWrapper';
import { Types as TableTypes } from '../../../../../Shared/Table';
import { Requests } from '../../../../../State';
import { getSearchColumns } from '../../../../../utils';

const styles = require('./available-users.module.css');

interface AvailableUsersProps {
    callback: (user: RequestsTypes.AssigneeResponse) => void;
    cancelCallback: () => void;
    requestId: number;
    user: Requests.Types.RequestUserSummary | null;
}

const searchColumns = (term: string): FilterColumn[] =>
    getSearchColumns(term, [
        RequestsTypes.AssigneeColumns.email,
        RequestsTypes.AssigneeColumns.name,
        RequestsTypes.AssigneeColumns.id,
    ]);

export const AvailableUsers: React.FC<AvailableUsersProps> = ({ callback, cancelCallback, requestId, user }) => {
    const [availableUsers, setAvailableUsers] = React.useState<any>([]);
    const [usersLoaded, setUsersLoaded] = React.useState<boolean>(false);
    const [pending, setPending] = React.useState<boolean>(false);
    const [showConfirmation, toggleConfirmation] = React.useState<boolean>(false);
    const [pendingUser, setPendingUser] = React.useState<RequestsTypes.AssigneeResponse | undefined>();

    const loadUsers = (searchTerm: string) => {
        setPending(true);

        const params = new PagedSortedFilteredRequestParams(
            [
                {
                    columnName: RequestsTypes.AssigneeColumns.name,
                    sortDirection: TableTypes.SortDirection.ASC,
                },
            ],
            [...searchColumns(searchTerm)],
            500,
            1,
        );

        RequestsAPI.getAvailableAssignees(requestId, params)
            .then((pagedResponse) => {
                setAvailableUsers(pagedResponse.results);
                setUsersLoaded(true);
                setPending(false);
            })
            .catch(() => {
                setPending(false);
            });
    };

    const selectUser = (user: RequestsTypes.AssigneeResponse) => {
        setPendingUser(user);
        toggleConfirmation(true);
    };

    const cancel = () => {
        cancelCallback();
    };

    const confirm = () => {
        if (pendingUser) callback(pendingUser);
    };

    return (
        <>
            {!showConfirmation ? (
                <>
                    <Formik
                        initialValues={{
                            search: '',
                        }}
                        onSubmit={({ search: searchTerm }) => {
                            loadUsers(searchTerm);
                        }}
                        validationSchema={Yup.object({
                            search: Yup.string().required('A search term is required'),
                        })}
                    >
                        <Form>
                            <FlexWrapper justify="between" align="start">
                                <FormRow withMargin={false}>
                                    <FormInputs.Text
                                        id="search"
                                        name="search"
                                        label="Search Available Users"
                                        hideLabel
                                        required
                                        fullWidth
                                    />
                                </FormRow>
                                <button type="submit" className={styles.SearchIcon}>
                                    <MagnifyingGlass />
                                </button>
                            </FlexWrapper>
                        </Form>
                    </Formik>
                    {usersLoaded ? (
                        <ScrollWrapper style={{ marginTop: '0.5rem' }} maxHeight="20rem">
                            {availableUsers
                                .filter((u: RequestsTypes.AssigneeResponse) => (user ? user.id !== u.id : true))
                                .map((u: RequestsTypes.AssigneeResponse) => (
                                    <div
                                        key={`available-user-list-${u.id}`}
                                        className={styles.AvailableUserRow}
                                        onClick={() => selectUser(u)}
                                    >
                                        <p>{u.name}</p>
                                        <p>{u.email}</p>
                                    </div>
                                ))}
                        </ScrollWrapper>
                    ) : pending ? (
                        <LoadingContent lowProfile />
                    ) : (
                        <NoContent lowProfile message="Search Available Users" />
                    )}
                    <Button callback={cancel} text="Cancel" fullWidth lowProfile withMarginTop inverse />
                </>
            ) : (
                <div className={styles.ConfirmationPanel}>
                    {user ? (
                        <>
                            <p>
                                <b>Currently assigned to:</b>
                            </p>
                            <p>{user?.name || ''}</p>
                            <p style={{ marginBottom: '0.75rem' }}>{user?.email || ''}</p>
                            <p>
                                <b>Change assignment to:</b>
                            </p>
                            <p>{pendingUser?.name || ''}</p>
                            <p>{pendingUser?.email || ''}</p>
                        </>
                    ) : (
                        <>
                            <p>
                                <b>Confirm assignment for:</b>
                            </p>
                            <p>{pendingUser?.name || ''}</p>
                            <p>{pendingUser?.email || ''}</p>
                        </>
                    )}
                    <Button callback={confirm} text="Confirm" fullWidth lowProfile withMarginTop />
                    <Button
                        callback={() => toggleConfirmation(false)}
                        text="Cancel"
                        fullWidth
                        inverse
                        lowProfile
                        withMarginTop
                    />
                </div>
            )}
        </>
    );
};

