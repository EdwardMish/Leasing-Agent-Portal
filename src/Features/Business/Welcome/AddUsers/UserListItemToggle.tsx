import * as React from 'react';

import { Circle, CircleWithDot, IconColors } from '../../../../Icons';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';

interface UserListItemToggleProps {
    handler: (id: number) => void;
    selectedUsers: number[];
    user: {
        name: string;
        email: string;
        id: number;
    };
}

const UserListItemToggle: React.FC<UserListItemToggleProps> = ({ handler, selectedUsers, user }) => {
    const { name, email, id } = user;

    const [userIsSelected, toggleUserSelected] = React.useState<boolean>(false);

    React.useEffect(() => {
        selectedUsers.includes(id) ? toggleUserSelected(true) : toggleUserSelected(false);
    }, [selectedUsers.length, JSON.stringify(selectedUsers)]);

    const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();

        handler(id);
    };
    // TODO: Colors could be a global enum, not just for Icons
    return (
        <div
            onClick={handleClick}
            style={{
                border: '1px solid',
                borderColor: userIsSelected ? IconColors.BrandBlue : 'rgb(220, 220, 220)',
                padding: '0.75rem',
                borderRadius: '4px',
                margin: '0 0 0.625rem',
                width: '100%',
                cursor: 'pointer',
            }}
        >
            <FlexWrapper align="center" justify="start">
                {userIsSelected ? (
                    <CircleWithDot aspect="1.5rem" color={IconColors.BrandBlue} />
                ) : (
                    <Circle aspect="1.5rem" color={IconColors.LightGrey} />
                )}
                <div style={{ marginLeft: '0.75rem' }}>
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
            </FlexWrapper>
        </div>
    );
};

export default UserListItemToggle;
