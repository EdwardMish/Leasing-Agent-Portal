import * as React from 'react';

import styles from '../Pages/prospective-tenant.module.css';

interface TabStyles {
    tab: string;
    handleTab: React.MouseEventHandler<HTMLButtonElement>;
    tabName1: string;
    tabName2: string;
    tabName3?: string;
    tabName4?: string;
}

const Tabs: React.FC<TabStyles> = ({ tab, handleTab, tabName1, tabName2, tabName3, tabName4 }) => {
    return (
        <div className={styles.MockTabWrapper}>
            <button
                className={tab == 'tab1' ? styles.TabSelected : styles.MockTab}
                onClick={handleTab}
                name={'tab1'}
                value={'tab1'}
                style={{ marginRight: '10px' }}
            >
                {tabName1}
            </button>
            <button
                className={tab == 'tab2' ? styles.TabSelected : styles.MockTab}
                onClick={handleTab}
                name={'tab2'}
                value={'tab2'}
                style={{ marginRight: '10px' }}
            >
                {tabName2}
            </button>
            <button
                className={tab == 'tab3' ? styles.TabSelected : styles.MockTab}
                onClick={handleTab}
                name={'tab3'}
                value={'tab3'}
                style={{ marginRight: '10px' }}
            >
                {tabName3}
            </button>
            <button
                className={tab == 'tab4' ? styles.TabSelected : styles.MockTab}
                onClick={handleTab}
                name={'tab4'}
                value={'tab4'}
            >
                {tabName4}
            </button>
        </div>
    );
};

export default Tabs;
