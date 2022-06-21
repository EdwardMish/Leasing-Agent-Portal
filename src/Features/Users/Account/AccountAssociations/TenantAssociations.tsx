import * as React from 'react';
import { Occupants } from '../../../../State';
import { SecondaryTitle } from '../../../../Shared/PageElements';
import { mapOccupantResponseToOccupant } from '../../../../utils/Mappers';
import { OccupantTypes, OccupantAPI } from 'API/Occupant';

const accountStyles = require('../user-account.module.css');

interface TenantAssociationsProps {
    userId: number;
}

type Occupant = Occupants.Types.Occupant;

export const TenantAssociations: React.FC<TenantAssociationsProps> = ({ userId }) => {
    const [occupantsAreLoaded, toggleLoaded] = React.useState<boolean>(false);
    const [occupants, setOccupants] = React.useState<Occupant[]>([]);

    React.useEffect(() => {
        OccupantAPI.getOccupantsOfUser(userId).then(({ occupants: res }: { occupants: OccupantTypes.Occupant[] }) => {
            setOccupants(res.map((o) => mapOccupantResponseToOccupant(o)));
            toggleLoaded(true);
        });
    }, [userId]);

    return (
        <>
            {occupantsAreLoaded ? (
                <ul className={accountStyles.UserAccountList}>
                    {occupants.map((o: Occupant) => (
                        <li key={`user-account-tenants-${o.id}`}>{o.name}</li>
                    ))}
                </ul>
            ) : (
                <SecondaryTitle title="Loading Tenants..." />
            )}
        </>
    );
};

