import * as React from 'react';

import { Close, IconColors, Pencil } from '../../Icons';

import { FlexWrapper } from '../../Shared/FlexWrapper';
import flexUtils from '../../Shared/FlexWrapper/utils';

interface AccountDetailsSectionTitleProps {
    title: string;
    active: boolean;
    toggleActive: () => void;
}

const AccountDetailsSectionTitle: React.FC<AccountDetailsSectionTitleProps> = ({ title, active, toggleActive }) => (
    <FlexWrapper align="center" justify="between">
        <h2
            style={{
                fontSize: '0.8rem',
                margin: 0,
                fontWeight: 400,
                color: IconColors.LightGrey,
            }}
        >
            {title}
        </h2>
        <button type="button" onClick={toggleActive} style={{ backgroundColor: 'white', border: 'none' }}>
            <div
                style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    cursor: 'pointer',
                    ...flexUtils.flexWrapperStyles({
                        justify: 'center',
                        align: 'center',
                    }),
                }}
            >
                {active ? (
                    <Close aspect="1.1rem" color={IconColors.BrandBlue} />
                ) : (
                    <Pencil aspect="1.1rem" color={IconColors.BrandBlue} />
                )}
            </div>
        </button>
    </FlexWrapper>
);

export default AccountDetailsSectionTitle;
