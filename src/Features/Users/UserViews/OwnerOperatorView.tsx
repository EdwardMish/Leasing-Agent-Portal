import * as React from 'react';

import { UserRolesAPI } from '../../../API';

import { SecondaryTitle } from '../../../Shared/PageElements';
import { MultiplePropertySelection, useMultiplePropertySelection } from '../../../Shared/PropertyTenantResolution';

import { Property, Role } from '../../../State/Shared/Types';

import { useModel } from '../../../utils/windowModels';

import { RoleSelect } from '../RoleSelect';

import formStyles = require('../UserForm/user-form.module.css');
import styles = require('./user-views.module.css');

interface OwnerOperatorViewProps {
    setProperties: (propertyIds: number[]) => void;
    setUserRoles: (roles: Role[]) => void;
    selectedRoles: Role[];
}

export const OwnerOperatorView: React.FC<OwnerOperatorViewProps> = ({ setProperties, setUserRoles, selectedRoles }) => {
    const [roles, setRoles] = React.useState<Role[]>([]);

    React.useEffect(() => {
        UserRolesAPI.getOORoles()
            .then((roles) => setRoles(roles))
            .catch(() => { });
    }, []);

    const [
        availableProperties,
        selectedProperties,
        addMultipleProperties,
        toggleProperty,
        searchProperties,
        loaded,
    ] = useMultiplePropertySelection();

    const [modelValues] = useModel(['AssociatedPropertyIds']);

    const propertyIdsFromModel = modelValues.AssociatedPropertyIds;

    React.useEffect(() => {
        setProperties(selectedProperties);
    }, [selectedProperties]);

    React.useEffect(() => {
        if (propertyIdsFromModel && propertyIdsFromModel.length > 0) {
            addMultipleProperties(propertyIdsFromModel);
        }
    }, [propertyIdsFromModel]);

    const handleSearch = (searchTerm: string) => {
        searchProperties(searchTerm);
    };

    const properties = availableProperties.filter((p: Property) => selectedProperties.includes(p.id));

    const handleRole = (roleId: number) => {
        const role: Role | undefined = roles.find((role) => role.id === roleId);
        const roleIndex = selectedRoles.map(({ id }) => id).indexOf(roleId);

        if (!role) return;

        if (roleIndex === -1) {
            setUserRoles([...selectedRoles, role]);

            return;
        }

        setUserRoles([
            ...selectedRoles.slice(0, roleIndex),
            ...selectedRoles.slice(roleIndex + 1),
        ]);
    };

    return (
        <>
            <div className={styles.SplitView}>
                <div>
                    <SecondaryTitle title="Select Roles" />
                    {
                        roles.map((role) => (
                            <RoleSelect
                                key={`role-select-oo-${role.id}`}
                                role={role}
                                selectedRoles={selectedRoles}
                                toggleRole={handleRole}
                            />
                        ))
                    }
                </div>
                <div>
                    <MultiplePropertySelection
                        availableProperties={availableProperties}
                        selectedProperties={selectedProperties}
                        searchHandler={handleSearch}
                        propertyHandler={toggleProperty}
                        loaded={loaded}
                    />
                </div>
            </div>
            <select
                className={formStyles.HiddenField}
                id="AssociatedPropertyIds"
                name="AssociatedPropertyIds"
                multiple
                onChange={() => { }}
                value={properties.map((p: Property) => `${p.id}`)}
            >
                {
                    properties.map(({ id }: Property) => <option value={id} key={`property-resolution-option-${id}`} />)
                }
            </select>
        </>
    );
};
