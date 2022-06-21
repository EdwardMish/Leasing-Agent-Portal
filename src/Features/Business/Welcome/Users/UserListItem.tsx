import * as React from 'react';

import { IconColors, InteractiveIcon, Remove } from '../../../../Icons';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';

interface UserListItemProps {
    id: number;
    email: string;
    name: string;
    handleRemove?: (occupantId: number) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
    id, name, email, handleRemove,
}) => (
    <FlexWrapper
        align="center"
        justify="between"
        wrap
        style={{
            border: '1px solid rgb(220, 220, 220)',
            padding: '0.75rem',
            borderRadius: '4px',
            margin: '0 0 0.625rem',
            width: '100%',
        }}
    >
        <div>
            <p>{name}</p>
            <p>{email}</p>
        </div>
        {handleRemove && (
            <div>
                <InteractiveIcon
                    aspect="2rem"
                    iconAspect="1.25rem"
                    Icon={Remove}
                    action={() => {
                        handleRemove(id);
                    }}
                    color={IconColors.LightGrey}
                />
            </div>
        )}
    </FlexWrapper>
);

export default UserListItem;
