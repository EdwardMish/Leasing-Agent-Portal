import * as React from 'react';

const styles = require('../tab-states.module.css');

interface TabStatesWithComponentProps {
    tabs: {
        name: string;
        callBack: (value: number) => void;
    }[];
    withMargin?: boolean;
}

export const TabStatesWithComponent: React.FC<TabStatesWithComponentProps> = (props) => {
    const { tabs, withMargin = true } = props;

    const [currentView, setCurrentView] = React.useState<number>(0);

    const setView = (index: number, callBack: (value) => void): void => {
        if (currentView !== index) {
            setCurrentView(index);
            callBack(index);
        }
    };

    return (
        <div className={`${styles.TabStates} ${styles.WithComponent} ${!withMargin ? styles.NoMargin : ''}`}>
            <div className={styles.TabStatesRow}>
                {
                    tabs.map(({ name, callBack }, index) => (
                        <h2
                            className={currentView === index ? styles.TabStatesActiveTab : styles.TabStatesInctiveTab}
                            onClick={() => setView(index, callBack)}
                            key={`tab-state-${name}`}
                        >
                            {name}
                        </h2>
                    ))
                }
            </div>
            <div>
                {props.children}
            </div>
        </div>
    );
};
