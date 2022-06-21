import * as React from 'react';

import { Alert } from '../../../API/Alerts/AlertsTypes/Alert';

import { ChevronUp, ChevronDown, IconColors } from '../../../Icons';

import { IconWithTextWithCallback } from '../../../Shared/PageElements';
import { TabStates } from '../../../Shared/TabStates';

import AlertItem from './AlertItem';

import ExpireAlert from './ManageAlert/ExpireAlert';
import ExtendAlert from './ManageAlert/ExtendAlert';

const ActiveAlertItem: React.FC<{ alert: Alert; refreshCallback: () => void }> = ({
    alert,
    refreshCallback,
}): React.ReactElement => {
    const { alertId } = alert;

    const [menuOpen, toggleMenuOpen] = React.useState<boolean>(false);

    const [viewState, setViewState] = React.useState<'expire' | 'extend'>('expire');

    const expireCallback = () => {
        setViewState('expire');
    };

    const extendCallback = () => {
        setViewState('extend');
    };

    const tabs = [
        { name: 'Expire', callBack: expireCallback },
        { name: 'Extend', callBack: extendCallback },
    ];

    return (
        <div
            style={{
                margin: '0 0 1.25rem',
                padding: '1rem',
                border: `1px solid ${IconColors.WarningRed}`,
                borderRadius: '0.25rem',
            }}
        >
            <AlertItem alert={alert} />
            <div
                style={{
                    margin: '1rem 0 -.25rem',
                    padding: '0.75rem 0 0',
                    borderTop: `1px solid ${IconColors.WarningRed}`,
                }}
            >
                <IconWithTextWithCallback
                    text="Manage Alert"
                    Icon={menuOpen ? ChevronUp : ChevronDown}
                    iconOnLeft
                    color={IconColors.WarningRed}
                    callBack={() => toggleMenuOpen(!menuOpen)}
                />
                {menuOpen && (
                    <div
                        style={{
                            margin: '1rem 0.5rem 0.5rem',
                        }}
                    >
                        <TabStates tabs={tabs} withMargin />
                        {viewState === 'expire' ? (
                            <ExpireAlert alertId={alertId} refreshCallback={refreshCallback} />
                        ) : (
                            <ExtendAlert alertId={alertId} refreshCallback={refreshCallback} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveAlertItem;
