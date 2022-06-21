import * as React from 'react';
import { IconWithText } from '../../PageElements';

import { TabStatesTabAction, TabStatesTabWithAction } from '../Types';

const styles = require('../tab-states.module.css');

interface TabStatesWithActionProps {
    tabs: TabStatesTabWithAction[];
    currentTab?: number;
    withMargin?: boolean;
}

export const TabStatesWithAction: React.FC<TabStatesWithActionProps> = ({ tabs, currentTab = 0, withMargin = true }) => {
    const [currentView, setCurrentView] = React.useState<number>(currentTab);
    const [currentViewAction, setCurrentViewAction] = React.useState<TabStatesTabAction | undefined>(undefined);

    const setView = (index: number, callBack: (value) => void): void => {
        if (currentView !== index) {
            setCurrentView(index);
            callBack(index);
        }
    };

    React.useEffect(() => {
        setCurrentViewAction(tabs[currentView]?.action);
    }, [currentView]);

    return (
        <div className={`${styles.TabStates} ${styles.TabStatesWithAction} ${!withMargin ? styles.NoMargin : ''}`}>
            <div className={styles.TabWrapper}>
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
            {
                currentViewAction
                && (
                    <div className={styles.ActionWrapper} onClick={() => { currentViewAction.callBack(); }}>
                        <IconWithText text={currentViewAction.actionTitle} Icon={currentViewAction.ActionIcon} />
                    </div>
                )
            }
        </div>
    );
};
