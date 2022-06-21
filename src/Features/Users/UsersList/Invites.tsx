import { IconColors, MagnifyingGlass } from 'Icons';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ConfirmationModal } from 'Shared/ConfirmationModal';
import PrependWrapper from 'Shared/Table/PrependWrapper';
import { addErrorMessage } from 'State/GlobalMessages/actionCreators';
import {
    FilterColumn,
    FilterOperation,
    PagedSortedFilteredRequestParams,
} from '../../../API/Shared/PagedSortedFilteredRequest';
import { UsersAPI } from '../../../API/User/UsersAPI';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import flexWrapperStyles from '../../../Shared/FlexWrapper/utils/flexWrapperStyles';
import { Search } from '../../../Shared/Search';
import { Components, Types } from '../../../Shared/Table';
import { globalMessageActionCreators } from '../../../State';
import { PagedResponse } from '../../../Types/api-types/Shared/PagedResponse';
import { getSearchColumns } from '../../../utils';
import { ListSkeleton } from '../../Requests/List/Skeletons';
import { columnDisplay, columns, rowSelectOptions, UserListColumnNames } from './columns';

type User = UsersAPI.User & { hasAcceptedInvitation: boolean; invitationHasExpired: boolean };

const searchColumns = (term: string): FilterColumn[] =>
    getSearchColumns(term, [
        UserListColumnNames.email,
        UserListColumnNames.firstName,
        UserListColumnNames.lastName,
        UserListColumnNames.id,
        UserListColumnNames.userType,
    ]);

const buildParams = (
    sortColumn: UserListColumnNames,
    sortDirection: Types.SortDirection,
    searchTerm: string,
    numberOfRows: number,
    currentPage: number,
): PagedSortedFilteredRequestParams =>
    new PagedSortedFilteredRequestParams(
        [
            {
                columnName: sortColumn,
                sortDirection,
            },
        ],
        [
            ...searchColumns(searchTerm),
            {
                columnNames: [UserListColumnNames.hasAcceptedInvitation],
                value: 'false',
                filterOperation: FilterOperation.EQUALS,
            },
        ],
        numberOfRows,
        currentPage,
    );

const UsersListInvitesTable: React.FC = () => {
    const dispatch = useDispatch();

    const [users, setUsers] = React.useState<User[]>([]);
    const [userState, setUserState] = React.useState<'notLoaded' | 'pending' | 'loaded'>('notLoaded');

    const initialColumn: UserListColumnNames = UserListColumnNames.email;
    const initialRowOption: { value: number; display: number } = rowSelectOptions[0];

    const [sortColumn, setSortColumn] = React.useState<UserListColumnNames>(initialColumn);
    const [sortDirection, setSortDirection] = React.useState<Types.SortDirection>(Types.SortDirection.ASC);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(initialRowOption.value);
    const [numberOfItems, setNumberOfItems] = React.useState<number>(initialRowOption.value);
    const [currentPageOverride, setCurrentPageOverride] = React.useState<number>(0);
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const [showDeleteConfirmationModal, toggleDeleteConfirmationModal] = React.useState<boolean>(false);
    const [showResendConfirmationModal, toggleResendConfirmationModal] = React.useState<boolean>(false);
    const [userToDelete, setUserToDelete] = React.useState<User | null>(null);
    const [userToResend, setUserToResend] = React.useState<User | null>(null);
    const [pendingDelete, togglePendingDelete] = React.useState<boolean>(false);
    const [pendingResend, togglePendingResend] = React.useState<boolean>(false);

    const getUsers = (newSearchTerm = '') => {
        setUserState('pending');

        const snapshot = `${sortColumn}-${sortDirection}-${searchTerm}-${numberOfRows}`;

        const params = new PagedSortedFilteredRequestParams(
            [
                {
                    columnName: sortColumn,
                    sortDirection,
                },
            ],
            [
                ...searchColumns(newSearchTerm || searchTerm),
                {
                    columnNames: [UserListColumnNames.hasAcceptedInvitation],
                    value: 'false',
                    filterOperation: FilterOperation.EQUALS,
                },
            ],
            numberOfRows,
            currentPage,
        );

        UsersAPI.getUsers(params)
            .then((usersResponse: PagedResponse<User>) => {
                if (`${sortColumn}-${sortDirection}-${searchTerm}-${numberOfRows}` === snapshot) {
                    setUsers(usersResponse.results);
                    setNumberOfItems(usersResponse.totalCount);

                    setUserState('loaded');
                }
            })
            .catch(() => {
                setUserState('loaded');
            });
    };

    React.useEffect(() => {
        const snapshot = `${sortColumn}-${sortDirection}-${searchTerm}-${numberOfRows}`;

        const params = buildParams(sortColumn, sortDirection, searchTerm, numberOfRows, currentPage);

        UsersAPI.getUsers(params)
            .then((usersResponse: PagedResponse<User>) => {
                if (`${sortColumn}-${sortDirection}-${searchTerm}-${numberOfRows}` === snapshot) {
                    setUsers(usersResponse.results);
                    setNumberOfItems(usersResponse.totalCount);
                }
            })
            .catch((error) => {
                dispatch(addErrorMessage(error));
            });
    }, [sortColumn, sortDirection, currentPage, numberOfRows]);

    const deleteInvite = (): void => {
        if (!userToDelete) return;

        togglePendingDelete(true);

        UsersAPI.deleteUserInvitation(userToDelete.id)
            .then(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(`User ${userToDelete.id}'s invitation has been deleted.`),
                );

                togglePendingDelete(false);
                setUserToDelete(null);
                toggleDeleteConfirmationModal(false);
                getUsers();
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        `User ${userToDelete.id}'s invitation could not be deleted.`,
                    ),
                );
            });
    };

    const resendInvite = (): void => {
        if (!userToResend) return;

        togglePendingResend(true);

        UsersAPI.resendUserInvitation(userToResend.id)
            .then(() => {
                dispatch(
                    globalMessageActionCreators.addSuccessMessage(`User ${userToResend.id}'s invitation has been resent.`),
                );
                togglePendingResend(false);
                setUserToResend(null);
                toggleResendConfirmationModal(false);
                getUsers();
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(`User ${userToResend.id}'s invite could not be resent.`),
                );
                togglePendingResend(false);
                setUserToResend(null);
                toggleResendConfirmationModal(false);
            });
    };

    const handleDeleteInvite = (user: User): void => {
        setUserToDelete(user);
        toggleDeleteConfirmationModal(true);
    };

    const handleResendInvite = (user: User): void => {
        setUserToResend(user);
        toggleResendConfirmationModal(true);
    };

    const submitSearch = () => {
        getUsers();
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleKeyboardSearch = (term: string) => {
        setSearchTerm(term);
        getUsers(term);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const sortColumns = (operator) => {
        setSortColumn(operator);
    };

    const sortDirections = (direction) => {
        setSortDirection(direction);
    };

    const handleNumberOfRows = (rowsDisplayed: number): void => {
        setCurrentPage(1);
        setCurrentPageOverride(1);
        setNumberOfRows(rowsDisplayed);
    };

    const handleCurrentPage = (page: number) => {
        setCurrentPage(page);
    };

    const clearOverride = () => {
        setCurrentPageOverride(0);
    };

    const formatData = (key: UserListColumnNames, user: User) =>
        key === UserListColumnNames.userType
            ? user[key] === 'tenant'
                ? 'Neighbor'
                : 'O.O.'
            : columnDisplay[key](user[key]);

    React.useEffect(() => {
        if (!searchTerm) getUsers();
    }, [searchTerm]);

    if (userState === 'notLoaded') {
        return <ListSkeleton message="Loading Users..." />;
    }

    return (
        <>
            <FlexWrapper
                justify="between"
                align="center"
                style={{
                    margin: '0 0 1rem',
                }}
            >
                <Search
                    clearCallback={clearSearch}
                    handler={handleSearch}
                    placeholder="Search Users"
                    keyboardHandler={handleKeyboardSearch}
                />
                <button type="button" onClick={submitSearch} style={{ border: 'none', backgroundColor: 'white' }}>
                    <div
                        style={{
                            ...flexWrapperStyles({
                                justify: 'center',
                                align: 'center',
                            }),
                            width: '2rem',
                            height: '2rem',
                            cursor: 'pointer',
                        }}
                    >
                        <MagnifyingGlass aspect="1.5rem" color={IconColors.BrandBlue} />
                    </div>
                </button>
            </FlexWrapper>
            <Components.Header
                columns={columns}
                initialSortColumn={UserListColumnNames.email}
                initialSortDirection={sortDirection}
                sortColumnCallback={sortColumns}
                sortDirectionCallback={sortDirections}
            />
            {userState !== 'loaded' ? (
                <ListSkeleton message="Loading Users" noHeader noFooter />
            ) : (
                <>
                    {users.length > 0 ? (
                        <>
                            {users.map((user: User) => (
                                <div
                                    key={`table-row-${user.id}`}
                                    style={{
                                        border: `1px solid ${IconColors.LightGrey}`,
                                        borderRadius: '0.25rem',
                                        margin: '0.75rem 0',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Components.Row rowWrapper="link" linkTarget={`/users/details/${user.id}`}>
                                        {columns.map(({ operator, display, width }) => (
                                            <Components.Column
                                                width={width}
                                                key={`user-data-${user.id}-${display.replace(' ', '-')}`}
                                            >
                                                <PrependWrapper data={formatData(operator, user)} display={display} />
                                            </Components.Column>
                                        ))}
                                    </Components.Row>
                                    <FlexWrapper
                                        align="start"
                                        justify="between"
                                        style={{ backgroundColor: IconColors.OffWhite }}
                                    >
                                        <button
                                            style={{
                                                display: 'block',
                                                float: 'left',
                                                fontSize: '0.8rem',
                                                width: 'auto',
                                                textAlign: 'left',
                                                margin: '0',
                                                border: 'none',
                                                padding: '0.75rem',
                                                cursor: 'pointer',
                                                color: IconColors.WarningRed,
                                                backgroundColor: IconColors.OffWhite,
                                            }}
                                            type="button"
                                            onClick={() => {
                                                handleDeleteInvite(user);
                                            }}
                                        >
                                            Delete Invitation
                                        </button>
                                        {user.invitationHasExpired === true && (
                                            <button
                                                style={{
                                                    backgroundColor: IconColors.OffWhite,
                                                    border: 'none',
                                                    float: 'right',
                                                    width: 'auto',
                                                    textAlign: 'right',
                                                    color: IconColors.DarkGrey,
                                                    padding: '0.75rem',
                                                    fontSize: '0.8rem',
                                                    display: 'block',
                                                    height: '100%',
                                                    cursor: 'pointer',
                                                    margin: '0',
                                                }}
                                                type="button"
                                                onClick={() => handleResendInvite(user)}
                                            >
                                                Resend Invite
                                            </button>
                                        )}
                                    </FlexWrapper>
                                </div>
                            ))}
                        </>
                    ) : (
                        <ListSkeleton message="No Users Found" noHeader noFooter />
                    )}
                </>
            )}
            <Components.Footer
                numberOfRecords={numberOfItems}
                numberOfRowsDisplayedCallback={handleNumberOfRows}
                currentPageCallback={handleCurrentPage}
                currentPageOverride={currentPageOverride}
                clearCurrentPageOverride={clearOverride}
                rowSelectOptions={rowSelectOptions}
            />
            {showDeleteConfirmationModal && (
                <ConfirmationModal
                    header="Delete User Invitation"
                    onCancel={() => {
                        toggleDeleteConfirmationModal(false);
                    }}
                    onConfirm={deleteInvite}
                    disableButton={pendingDelete}
                >
                    <>
                        <p
                            style={{
                                margin: '0 0 0.75rem',
                            }}
                        >
                            <strong>This will delete the invitation</strong>
                        </p>
                        <p
                            style={{
                                margin: '0 0 0.75rem',
                            }}
                        >{`${userToDelete?.firstName || ''} ${userToDelete?.lastName || ''} will no longer be invited.`}</p>
                        <p
                            style={{
                                margin: '0 0 1.75rem',
                            }}
                        >
                            <strong>Are you sure?</strong>
                        </p>
                    </>
                </ConfirmationModal>
            )}
            {showResendConfirmationModal && (
                <ConfirmationModal
                    header="Resend User Invitation"
                    onCancel={() => toggleResendConfirmationModal(false)}
                    onConfirm={resendInvite}
                    disableButton={pendingResend}
                >
                    <>
                        <p
                            style={{
                                margin: '0 0 0.75rem',
                            }}
                        >
                            <strong>This will resend an invitation</strong>
                        </p>
                        <p
                            style={{
                                margin: '0 0 0.75rem',
                            }}
                        >{`${userToResend?.firstName || ''} ${userToResend?.lastName || ''} will receive a new invite.`}</p>
                    </>
                </ConfirmationModal>
            )}
        </>
    );
};

export default UsersListInvitesTable;

