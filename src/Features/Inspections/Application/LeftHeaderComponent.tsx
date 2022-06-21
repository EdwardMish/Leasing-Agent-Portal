import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ChevronLeft, IconColors } from '../../../Icons';

import { FlexWrapper } from '../../../Shared/FlexWrapper';

const LeftHeaderComponent = (): React.ReactElement => {

    const { pathname } = useLocation();

    const showDashboardLink = pathname.endsWith('/app/inspections');

    return (
        <>
            {
                showDashboardLink
                    ?
                    <Link to="/">
                        <FlexWrapper align="center" justify="start">
                            <ChevronLeft aspect="1.25rem" color={IconColors.BrandBlue} />
                            <p style={{
                                margin: '0 0 0 0.125rem',
                                color: IconColors.BrandBlue,
                                fontWeight: 700,
                            }}
                            >
                                Dashboard
                            </p>
                        </FlexWrapper>
                    </Link>
                    :
                    null
            }
        </>
    )
}

export default LeftHeaderComponent;