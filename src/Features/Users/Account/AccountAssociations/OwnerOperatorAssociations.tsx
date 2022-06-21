import * as React from 'react';

import { SecondaryTitle } from '../../../../Shared/PageElements';
import { UserPropertiesAPI } from '../../../../API';

const accountStyles = require('../user-account.module.css');

interface OwnerOperatorAssociationsProps {
    userId: number;
}

export const OwnerOperatorAssociations: React.FC<OwnerOperatorAssociationsProps> = ({ userId }) => {
    const [propertiesAreLoaded, toggleLoaded] = React.useState<boolean>(false);
    const [properties, setProperties] = React.useState<UserPropertiesAPI.Property[]>([]);

    React.useEffect(() => {
        UserPropertiesAPI.get(userId)
            .then((res: UserPropertiesAPI.Property[]) => {
                setProperties(res);
                toggleLoaded(true);
            });
    }, [userId]);

    return (
        <>
            {
                propertiesAreLoaded
                    ? (
                        <ul className={accountStyles.UserAccountList}>
                            {
                                properties.map((p: UserPropertiesAPI.Property) => <li key={`user-roles-${p.id}`}>{p.name}</li>)
                            }
                        </ul>
                    )
                    : <SecondaryTitle title="Loading Properties..." />
            }
        </>
    );
};
