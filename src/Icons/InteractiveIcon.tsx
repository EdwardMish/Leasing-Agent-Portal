import * as React from 'react';
import { Close } from '.';

import { FlexWrapper } from '../Shared/FlexWrapper';

import { IconColors } from './IconColors';

interface InteractiveIconProps {
    action: () => void;
    active?: boolean;
    color: IconColors;
    iconAspect: string;
    Icon: any; // Set Generic for Aspect
    aspect?: string;
    className?: string;
}

export const InteractiveIcon: React.FC<InteractiveIconProps> = ({
    action,
    active,
    color,
    Icon,
    iconAspect,
    aspect = '2rem',
    className = '',
}) => (
    <div onClick={action}>
        <FlexWrapper
            className={className}
            style={{
                width: aspect,
                height: aspect,
                cursor: 'pointer',
            }}
            align="center"
            justify="center"
        >
            {
                active
                    ? <Close aspect={iconAspect} color={color} />
                    : <Icon aspect={iconAspect} color={color} />
            }
        </FlexWrapper>
    </div>
);
