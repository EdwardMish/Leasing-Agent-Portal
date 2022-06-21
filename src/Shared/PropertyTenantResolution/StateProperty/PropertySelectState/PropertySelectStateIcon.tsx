import * as React from 'react';

import { PropertySelectState } from '../../../../Types';

import { CheckMark, Close } from '../../../../Icons';

interface PropertySelectStateIconProps {
    count: number;
    state: PropertySelectState;
}

export const PropertySelectStateIcon: React.FC<PropertySelectStateIconProps> = ({ count, state }) => {
    switch (state) {
    case PropertySelectState.ALL:
        return <CheckMark />;
    case PropertySelectState.NONE:
        return <Close aspect="1.5rem" />;
    case PropertySelectState.SOME:
        return <span>{count}</span>;
    }
};
