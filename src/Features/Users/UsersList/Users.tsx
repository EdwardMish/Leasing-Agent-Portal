import * as React from 'react';
import {
    FilterColumn,
    FilterOperation,
    PagedSortedFilteredRequestParams,
} from '../../../API/Shared/PagedSortedFilteredRequest';

import { UsersAPI } from '../../../API/User/UsersAPI';
import { ListSkeleton } from '../../../Features/Requests/List/Skeletons';
import { IconColors, MagnifyingGlass } from '../../../Icons';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import flexWrapperStyles from '../../../Shared/FlexWrapper/utils/flexWrapperStyles';
import { Search } from '../../../Shared/Search';

import { Components, Types } from '../../../Shared/Table';
import PrependWrapper from '../../../Shared/Table/PrependWrapper';
import { PagedResponse } from '../../../Types/api-types/Shared/PagedResponse';
import { getSearchColumns } from '../../../utils';

import { columnDisplay, columns, rowSelectOptions, UserListColumnNames } from './columns';

type User = UsersAPI.User & { hasAcceptedInvitation: boolean };

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
                sortDirection: sortDirection,
            },
        ],
        [
            ...searchColumns(searchTerm),
            {
                columnNames: [UserListColumnNames.hasAcceptedInvitation],
                value: 'true',
                filterOperation: FilterOperation.EQUALS,
            },
        ],
        numberOfRows,
        currentPage,
    );

const UsersListUsersTable: React.FC = () => {
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

    const getUsers = (newSearchTerm: string = '') => {
        setUserState('pending');

        const snapshot = `${sortColumn}-${sortDirection}-${searchTerm}-${numberOfRows}`;

        const params = new PagedSortedFilteredRequestParams(
            [
                {
                    columnName: sortColumn,
                    sortDirection: sortDirection,
                },
            ],
            [
                ...searchColumns(newSearchTerm || searchTerm),
                {
                    columnNames: [UserListColumnNames.hasAcceptedInvitation],
                    value: 'true',
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
            .catch(() => {});
    }, [sortColumn, sortDirection, currentPage, numberOfRows]);

    React.useEffect(() => {
        !searchTerm && getUsers();
    }, [searchTerm]);

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
            <>
                {userState !== 'pending' ? (
                    <>
                        <Components.Header
                            columns={columns}
                            initialSortColumn={UserListColumnNames.email}
                            initialSortDirection={sortDirection}
                            sortColumnCallback={sortColumns}
                            sortDirectionCallback={sortDirections}
                        />
                        {users.length > 0 ? (
                            <>
                                {users.map((user: User) => (
                                    <Components.Row
                                        key={`table-row-${user.id}`}
                                        rowWrapper="link"
                                        linkTarget={`/users/details/${user.id}`}
                                    >
                                        {columns.map(({ operator, display, width }) => (
                                            <Components.Column
                                                width={width}
                                                key={`user-data-${user.id}-${display.replace(' ', '-')}`}
                                            >
                                                <PrependWrapper data={formatData(operator, user)} display={display} />
                                            </Components.Column>
                                        ))}
                                    </Components.Row>
                                ))}
                            </>
                        ) : (
                            <ListSkeleton message="No Users Found" noHeader noFooter />
                        )}
                        <Components.Footer
                            numberOfRecords={numberOfItems}
                            numberOfRowsDisplayedCallback={handleNumberOfRows}
                            currentPageCallback={handleCurrentPage}
                            currentPageOverride={currentPageOverride}
                            clearCurrentPageOverride={clearOverride}
                            rowSelectOptions={rowSelectOptions}
                        />
                    </>
                ) : (
                    <ListSkeleton message="Loading Users" />
                )}
            </>
        </>
    );
};

export default UsersListUsersTable;

