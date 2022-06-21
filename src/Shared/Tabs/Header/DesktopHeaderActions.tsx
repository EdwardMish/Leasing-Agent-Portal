import * as React from 'react';
import { IconColors, SecondaryMenu } from '../../../Icons';

const styles = require('../tabs.module.css');

interface DesktopHeaderActionsProps {
    actions: React.ReactElement[];
    omitToggle?: boolean;
    style?: React.CSSProperties;
}

const DesktopHeaderActions: React.FC<DesktopHeaderActionsProps> = ({ actions, omitToggle = true, style }) => {
    const [viewActions, toggleActions] = React.useState<boolean>(false);
    const handleActionsToggle = () => {
        toggleActions(!viewActions);
    };

    return (
        <>
            {actions.length === 1 && omitToggle ? (
                <div
                    style={{
                        alignSelf: 'flex-end',
                        padding: '0.5rem 0',
                        margin: '0 0 2px',
                        ...style,
                    }}
                >
                    {actions[0]}
                </div>
            ) : (
                <div
                    onClick={handleActionsToggle}
                    style={{
                        position: 'relative',
                        alignSelf: 'flex-end',
                        width: '2rem',
                        height: '2rem',
                        margin: '0 0 2px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        backgroundColor: viewActions ? IconColors.OffWhite : 'white',
                        borderRadius: '4px',
                        ...style,
                    }}
                >
                    <SecondaryMenu color={IconColors.DarkGrey} aspect="1.5rem" />
                    {viewActions && (
                        <div className={styles.ActionsMenu}>
                            {actions
                                .filter((action) => {
                                    if (
                                        Object.hasOwnProperty.call(action.props, 'shouldhide') &&
                                        typeof action.props.shouldhide === 'function'
                                    ) {
                                        return !action.props.shouldhide();
                                    }

                                    return true;
                                })
                                .map((action) => (
                                    <div
                                        key={`action-list-${action.props.actionid || 'unkown-action'}`}
                                        className={styles.ActionsMenuItem}
                                    >
                                        {action}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default DesktopHeaderActions;
