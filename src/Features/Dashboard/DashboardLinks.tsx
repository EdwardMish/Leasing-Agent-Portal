import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CurrentUserState } from '../../State';

import { IconColors } from '../../Icons';

import { FlexWrapper } from '../../Shared/FlexWrapper';

import { DashboardLink } from './Types/DashboardLink';

import { getLinksForUser } from './utils/getLinksForUser';

const DashboardLinks: React.FC<{}> = ({}) => {
    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(
        CurrentUserState.selectors.currentUser,
    );

    const linksForUser: DashboardLink[] = getLinksForUser(currentUser);

    const linkTextStyles: React.CSSProperties = {
        margin: '0.5rem 0 0',
        maxWidth: '6rem',
        color: IconColors.White,
        textAlign: 'center',
        fontFamily: 'Roboto Slab',
        fontSize: '1rem',
    };

    return (
        <FlexWrapper align='start' justify='center' wrap style={{ margin: '2rem 0' }}>
            {linksForUser.map(({ Icon, text, url }) => (
                <Link
                    key={`round-link-item-${url}-${text.replace(' ', '').toLowerCase()}`}
                    to={url}
                    style={{ margin: '0.5rem' }}
                >
                    <FlexWrapper
                        align='center'
                        justify='center'
                        column
                        style={{
                            borderRadius: '50%',
                            background: IconColors.BrandBlue,
                            width: '10rem',
                            height: '10rem',
                            color: IconColors.White,
                        }}
                    >
                        <Icon
                            aspect='4rem'
                            color={IconColors.White}
                            style={{
                                strokeWidth: '3px',
                            }}
                        />
                        <p style={linkTextStyles}>{text}</p>
                    </FlexWrapper>
                </Link>
            ))}
        </FlexWrapper>
    );
};

export default DashboardLinks;
