import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { configurations } from '../../Features';

import { CurrentUserState, emergencyNewsItemSelectors } from '../../State';

import { RouteNavigationConfiguration } from '../Types/RouteNavigationConfiguration';

const styles = require('./navigation.module.css');

export const Navigation: React.FC<{}> = () => {
    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);
    const hasEmergencyNewsItems: boolean = useSelector(emergencyNewsItemSelectors.hasEmergencyNewsItems);

    return (
        <nav className={styles.Navigation}>
            <ul className={`${hasEmergencyNewsItems ? styles.WithEmergencyItems : styles.NoEmergencyItems}`}>
                {configurations
                    .filter((config: RouteNavigationConfiguration) => !config.disableFeature.includes('main'))
                    .filter(
                        (config: RouteNavigationConfiguration) =>
                            !!config.navigation?.main && config.navigation.main.isAllowed(currentUser)
                    )
                    .map(({ navigation: { main } }: RouteNavigationConfiguration) => (
                        <li key={`core-navigation-${main?.route.url.replace('/', '').toLowerCase()}`}>
                            <NavLink
                                data-qa-navigation-link={main?.text}
                                className="dropdown-item"
                                to={main?.route?.url || ''}
                                activeClassName={styles.ActiveItem}
                            >
                                {main?.text}
                            </NavLink>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};
