import * as React from 'react';

import { TabStatesTab } from './Types';

const styles = require('./tab-states.module.css');

interface TabStatesProps {
    tabs: TabStatesTab[];
    currentTab?: number;
    withMargin?: boolean;
}

export const TabStates: React.FC<TabStatesProps> = ({ tabs, currentTab = 0, withMargin = true }) => {
    const [currentView, setCurrentView] = React.useState<number>(currentTab);

    const setView = (index: number, callBack: (value) => void): void => {
        if (currentView !== index) {
            setCurrentView(index);
            callBack(index);
        }
    };

    return (
        <div className={`${styles.TabStates} ${!withMargin ? styles.NoMargin : ''}`}>
            {
                tabs.map(({ name, callBack }, index) => (
                    <h2
                        className={currentView === index ? styles.TabStatesActiveTab : styles.TabStatesInactiveTab}
                        onClick={() => setView(index, callBack)}
                        key={`tab-state-${name}`}
                    >
                        {name}
                    </h2>
                ))
            }
        </div>
    );
};
