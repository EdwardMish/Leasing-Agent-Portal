import * as React from 'react';

import { PropertySelectState } from '../../../../Types';

interface PropertySelectStateTextProps {
    count: number;
    state: PropertySelectState;
}

export const PropertySelectStateText: React.FC<PropertySelectStateTextProps> = ({ count, state }) => {
    switch (state) {
    case PropertySelectState.ALL:
        return <p>All Tenants Selected</p>;
    case PropertySelectState.NONE:
        return <p>No Tenants Selected</p>;
    case PropertySelectState.SOME:
        return count > 1 ? <p>Tenants Selected</p> : <p>Tenant Selected</p>;
    }
};
