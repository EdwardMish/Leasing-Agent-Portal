import { Add, IconColors } from 'Icons';
import { IconProps } from 'Icons/IconProps';
import React from 'react';
import { Link } from 'react-router-dom';
import { IconWithText } from '../../PageElements';
import Style from './iconLink-module.css';

interface IconLinkProps {
    Icon?: React.FC<IconProps>;
    route: string;
    color?: IconColors;
    text?: string;
    textSize?: string;
    iconOnLeft?: boolean;
    style?: Record<string, string>;
    state?: any;
    iconAspect?: string;
    wrapText?: boolean;
}

const IconLink = ({
    Icon = Add,
    route,
    color = IconColors.BrandBlue,
    text = '',
    textSize,
    iconOnLeft = true,
    style = { maxWidth: '100%' },
    state,
    wrapText = false,
    iconAspect,
}: IconLinkProps): React.ReactElement => (
    <Link to={{ pathname: route, state }} className={Style.IconLink} style={style}>
        <IconWithText
            text={text}
            textSize={textSize}
            Icon={Icon}
            iconOnLeft={iconOnLeft}
            color={color}
            iconAspect={iconAspect}
            wrapText={wrapText}
        />
    </Link>
);

export default IconLink;
