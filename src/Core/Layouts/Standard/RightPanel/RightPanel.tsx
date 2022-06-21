import { UserPanel } from 'Core/UserPanel';
import Conversations from 'Features/Conversations';
import Tasks from 'Features/Tasks';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { emergencyNewsItemSelectors } from 'State';
import styles from './right-panel.module.css';
import { Close, IconColors } from 'Icons';

interface RightPanelProps {
    viewState: number;
    onClose: () => void;
}

const panelViews = [null, <UserPanel />, <Conversations.ConversationPanel />, <Tasks.Panels.TaskPanel />];

export const RightPanel: React.FC<RightPanelProps> = ({ viewState, onClose }) => {
    const hasEmergencyNewsItems = useSelector(emergencyNewsItemSelectors.hasEmergencyNewsItems);

    return (
        <div className={`${styles.RightPanel} ${viewState > 0 ? styles.OpenPanel : styles.ClosedPanel}`} id="rightPanel">
            <div
                className={`${styles.RightPanelBody} ${
                    hasEmergencyNewsItems ? styles.HasEmergencyItems : styles.NoEmergencyItems
                }`}
            >
                <div className={styles.CloseRightPanelXButton} onClick={onClose}>
                    <Close aspect="1.5rem" color={IconColors.BrandBlue} />
                </div>
                {panelViews[viewState] || null}
            </div>
            <div className={styles.RightPanelFooter}>
                <ul>
                    <li>
                        <a href="/privacy.html" target="_blank" rel="noreferrer">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="/terms.html" target="_blank" rel="noreferrer">
                            Terms and Conditions
                        </a>
                    </li>
                    <li>
                        <a href="/privacy.html#california-rights" target="_blank" rel="noreferrer">
                            Privacy Notice
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

