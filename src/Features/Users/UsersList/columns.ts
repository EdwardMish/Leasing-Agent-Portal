import { Types } from '../../../Shared/Table';

enum UserListColumnNames {
    email = 'email',
    firstName = 'firstName',
    lastName = 'lastName',
    id = 'id',
    userType = 'userType',
    hasAcceptedInvitation = 'hasAcceptedInvitation',
}

const emailColumn: Types.TableColumn = {
    display: 'Email',
    width: '20rem',
    operator: UserListColumnNames.email,
    prependMobileRow: true,
};

const firstNameColumn: Types.TableColumn = {
    display: 'First Name',
    width: '12rem',
    operator: UserListColumnNames.firstName,
    prependMobileRow: true,
};

const lastNameColumn: Types.TableColumn = {
    display: 'Last Name',
    width: '12rem',
    operator: UserListColumnNames.lastName,
    prependMobileRow: true,
};

const idColumn: Types.TableColumn = {
    display: 'Id',
    width: '3rem',
    operator: UserListColumnNames.id,
    prependMobileRow: true,
};

const userTypeColumn: Types.TableColumn = {
    display: 'User Type',
    width: '8rem',
    operator: UserListColumnNames.userType,
    prependMobileRow: true,
};

const columns: Types.TableColumn[] = [emailColumn, firstNameColumn, lastNameColumn, idColumn, userTypeColumn];

const columnDisplay = {
    [UserListColumnNames.email]: (email: string): string => email,
    [UserListColumnNames.firstName]: (firstName: string): string => firstName,
    [UserListColumnNames.lastName]: (lastName: string): string => lastName,
    [UserListColumnNames.id]: (id: number): number => id,
    [UserListColumnNames.userType]: (userType: string): string => userType,
};

const rowSelectOptions: { value: number; display: number }[] = [
    { value: 10, display: 10 },
    { value: 25, display: 25 },
    { value: 50, display: 50 },
    { value: 75, display: 75 },
    { value: 100, display: 100 },
];

export { columns, columnDisplay, UserListColumnNames, rowSelectOptions };
