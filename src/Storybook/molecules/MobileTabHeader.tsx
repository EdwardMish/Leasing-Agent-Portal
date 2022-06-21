import * as React from 'react';

import { HorizontalSelect } from '../../Shared/Forms/Select/HorizontalSelect';
import { SecondaryMenu } from '../../Icons/SecondaryMenu';

import styles from '../Pages/prospective-tenant.module.css';

interface MobileHeaderProps {
    title: string;
    tab1: string;
    tab2: string;
    tab3?: string;
    tab4?: string;
    handleTab: React.FormEventHandler;
    handleMenuOpen?: React.FormEventHandler;
    addOption?: boolean;
}

const MobileTabHeader: React.FC<MobileHeaderProps> = ({ title, tab1, tab2, tab3, tab4, handleTab, handleMenuOpen, addOption = false }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                margin: '1rem 0 .5rem 0',
            }}
        >
            <div
                className={styles.LeadInputHalfDropdown}
                onChange={handleTab}
                style={{ height: '2.75rem', width: addOption ? '92%' : '100%' }}
            >
                <HorizontalSelect
                    label={`${title} Type`}
                    id={`${title} Type`}
                    name={`${title} Type`}
                    hideLabel
                    required
                    selectWidth="100%"
                    column
                    fullHeight
                >
                    <option value="tab1">{tab1}</option>
                    <option value="tab2">{tab2}</option>
                    <option value="tab3">{tab3}</option>
                    <option value="tab4">{tab4}</option>
                </HorizontalSelect>
            </div>
            <div
                style={{
                    paddingBottom: '1rem',
                    width: '8%',

                    display: addOption ? 'flex' : 'none',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}

                onClick={handleMenuOpen}
            >
                <SecondaryMenu />
            </div>
        </div>
    );
};

export default MobileTabHeader;
