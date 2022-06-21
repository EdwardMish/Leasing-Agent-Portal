import * as React from 'react';
import { SelectFromAllOccupants, useSelectFromAllOccupants } from '../../../Shared/PropertyTenantResolution';
import { SecondaryTitle } from '../../../Shared/PageElements';
import { OccupantAPI, OccupantTypes } from 'API/Occupant';
import { UsersAPI } from 'API/User/UsersAPI';
import { API as BusinessAPI } from 'API/Business';

interface TenantSelectionProps {
    userId: number;
    callback?: () => void;
}

const promiseChain = async (
    promise: (userIdOrOccupantId: number, occupantIdOrUserId: number, roleId?: number) => Promise<void>,
    chain: number[],
    userId: number,
    roleId?: number,
): Promise<Error[]> => {
    let errors: Error[] = [];

    const currentOccupant: number | undefined = chain.shift();

    if (currentOccupant) {
        // TODO: Add role uses userId then OccupantID, remove uses opposite pattern
        // TODO: Presence of roleId shows intent to add role
        if (roleId) {
            await promise(userId, currentOccupant, roleId).catch((error: Error) => errors.push(error));
        } else {
            await promise(currentOccupant, userId).catch((error: Error) => errors.push(error));
        }
    }

    if (chain.length > 0) {
        if (roleId) {
            await promiseChain(promise, chain, userId, roleId).catch((err: Error[]) => (errors = [...errors, ...err]));
        } else {
            await promiseChain(promise, chain, userId).catch((err: Error[]) => (errors = [...errors, ...err]));
        }
    }

    return new Promise((res, rej) => {
        errors.length > 0 ? rej(errors) : res([]);
    });
};

export const TenantSelection: React.FC<TenantSelectionProps> = ({ callback, userId }) => {
    const [userAssociatonsLoaded, toggleLoaded] = React.useState<boolean>(false);

    const [properties, selectedOccupants, visibleOccupants, propertiesAreLoaded, toggleOccupants, searchHandler] =
        useSelectFromAllOccupants();

    React.useEffect(() => {
        OccupantAPI.getOccupantsOfUser(userId).then(({ occupants }: { occupants: OccupantTypes.Occupant[] }) => {
            toggleOccupants(occupants.map((o) => o.id));
            toggleLoaded(true);
        });
    }, [userId]);

    const handleOccupantToggle = (occupantIds: number[], operator?: string): void => {
        toggleOccupants(occupantIds, operator);
        const selectedSet = new Set(selectedOccupants);

        let toAdd: number[] = [];
        let toRemove: number[] = [];

        switch (operator) {
            // Only add ones that are not currently in selected
            case 'add':
                toAdd = occupantIds.filter((id) => !selectedSet.has(id));
                break;
            // Remove occupants that are currenty in selected
            case 'remove':
                toRemove = occupantIds.filter((id) => selectedSet.has(id));
                break;
            // Add ones not in there, remove ones that are
            default:
                toAdd = occupantIds.filter((id) => !selectedSet.has(id));
                toRemove = occupantIds.filter((id) => selectedSet.has(id));
                break;
        }

        if (toAdd.length > 0) {
            const add = BusinessAPI.addUserRole;

            // TODO: Implement default role. Default to 1 as Id for now
            promiseChain(add, toAdd, userId, 1)
                .then(() => {
                    if (callback) callback();
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (toRemove.length > 0) {
            const remove = UsersAPI.removeOccupantAssociation;

            promiseChain(remove, toRemove, userId)
                .then(() => {
                    if (callback) callback();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return userAssociatonsLoaded && propertiesAreLoaded ? (
        <SelectFromAllOccupants
            properties={properties}
            selectedOccupants={selectedOccupants}
            visibleOccupants={visibleOccupants}
            propertiesAreLoaded={propertiesAreLoaded}
            toggleOccupants={handleOccupantToggle}
            searchHandler={searchHandler}
        />
    ) : (
        <SecondaryTitle title="Loading Tenants..." />
    );
};

