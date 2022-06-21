import { RequestsAPI, RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'Shared/Modal/Modal';
import { Eye, EyeOff } from '../../../Icons';
import { Button } from '../../../Shared/Button';
import { NoContent, ToggleIcon } from '../../../Shared/PageElements';
import { ScrollWrapper } from '../../../Shared/ScrollWrapper';
import { CurrentUserState } from '../../../State';
import { ActiveWatchers } from './ActiveWatchers';
import { AvailableWatchers } from './AvailableWatchers';

const styles = require('./watching-request.module.css');

interface WatchingRequestProps {
    requestId: number;
}

export const WatchingRequest: React.FC<WatchingRequestProps> = ({ requestId }) => {
    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);

    const [watchers, setWatchers] = React.useState<RequestsTypes.WatcherResponse[]>([]);
    const [showMenu, toggleMenu] = React.useState<boolean>(false);
    const [showAddWatchers, toggleAddWatchers] = React.useState<boolean>(false);
    const [manageActive, toggleManageActive] = React.useState<boolean>(false);
    const [isWatching, toggleWatching] = React.useState<boolean>(false);

    const loadWatchers = () => {
        RequestsAPI.getDetails(requestId).then(({ watchers: watchersResponse }: RequestsTypes.RequestResponse) =>
            setWatchers(watchersResponse),
        );
    };

    React.useEffect(() => {
        loadWatchers();
    }, []);

    React.useEffect(() => {
        if (!!watchers.length) {
            if (watchers.map(({ id }) => id).includes(currentUser.id)) {
                toggleWatching(true);
            } else {
                toggleWatching(false);
            }
        } else {
            toggleWatching(false);
        }
    }, [JSON.stringify(watchers)]);

    const handleToggle = () => {
        toggleMenu(!showMenu);
    };

    const handleWatching = () => {
        if (isWatching) {
            RequestsAPI.removeWatcher(requestId, currentUser.id)
                .then(() => {
                    loadWatchers();
                })
                .catch(() => {});
        } else {
            RequestsAPI.addWatcher(requestId, currentUser.id)
                .then(() => {
                    loadWatchers();
                })
                .catch(() => {});
        }
    };

    return (
        <>
            <div className={styles.WatchingRequest}>
                <div
                    onClick={handleToggle}
                    className={styles.WatchingRequestIcon}
                    style={{ color: isWatching ? '#0071ce' : 'rgb(120,120,120)' }}
                >
                    <p style={{ marginRight: '0.4rem', lineHeight: '0.875rem' }}>{watchers.length}</p>
                    {isWatching ? <Eye /> : <EyeOff />}
                </div>
                {showMenu && (
                    <div className={styles.WatchingRequestMenu}>
                        <div onClick={handleWatching} className={styles.WatchingRequestToggle}>
                            <p>{`${isWatching ? '' : 'Not'} Watching`}</p>
                            <p>{`${isWatching ? 'Stop' : 'Start'} Watching`}</p>
                        </div>
                        <div className={styles.Watchers}>
                            {!!watchers.length && (
                                <p>{watchers.length === 1 ? 'One Watcher' : `${watchers.length} Watchers`}</p>
                            )}
                            {!!watchers.length ? (
                                <ScrollWrapper style={{ margin: '0.5rem 0' }} maxHeight="20rem">
                                    {watchers.map(({ name = '', email = '' }: RequestsTypes.WatcherResponse) => (
                                        <div
                                            key={`watcers-${name.replace(' ', '').toLowerCase()}-${email
                                                .replace(' ', '')
                                                .toLowerCase()}`}
                                            className={styles.WatcherRow}
                                        >
                                            <p>{name}</p>
                                            <p>{email}</p>
                                        </div>
                                    ))}
                                </ScrollWrapper>
                            ) : (
                                <NoContent
                                    lowProfile
                                    withMarginBottom={false}
                                    withMarginTop={false}
                                    message="There are no Watchers"
                                />
                            )}
                        </div>
                        <div style={{ padding: '0 0.75rem 0.75rem' }}>
                            <Button fullWidth text="Manage Watchers" callback={() => toggleAddWatchers(true)} lowProfile />
                        </div>
                    </div>
                )}
            </div>
            {showAddWatchers && (
                <Modal header="Manage Watchers" callBack={() => toggleAddWatchers(false)}>
                    <div style={{ padding: '0.5rem 1rem 0' }}>
                        <ToggleIcon
                            active={manageActive}
                            message="Manage Active Watchers"
                            toggle={() => toggleManageActive(!manageActive)}
                        />
                    </div>
                    <div style={{ padding: '0.5rem 1rem 0' }}>
                        {manageActive ? (
                            <ActiveWatchers
                                currentWatchers={watchers}
                                requestId={requestId}
                                watcherCallback={() => loadWatchers()}
                            />
                        ) : (
                            <AvailableWatchers
                                currentWatchers={watchers}
                                requestId={requestId}
                                watcherCallback={() => loadWatchers()}
                            />
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
};

