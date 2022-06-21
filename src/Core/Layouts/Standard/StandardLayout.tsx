import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { CurrentUserState } from '../../../State';
import { selectors } from '../../../State/ToastMessages';
import { ToastMessageTrigger, ToastMessageTriggers } from '../../../State/ToastMessages/Types';
import { RouteNavigationConfiguration } from '../../Types/RouteNavigationConfiguration';

import { configurations } from '../../../Features';
import { NoContent } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import Dashboard from '../../../Features/Dashboard';

import { Body } from './Body';
import { Header } from './Header';
import { RightPanel } from './RightPanel';

interface StandardLayoutProps {
    currentUser: CurrentUserState.Types.CurrentUser;
}

const StandardLayout: React.FC<StandardLayoutProps> = ({ currentUser }) => {
    const { pathname } = useLocation();

    const [navIsOpen, toggleNav] = React.useState<boolean>(false);
    const [rightPanelViewState, setRightPanelViewState] = React.useState<number>(0);
    const [lastPath, setLastPath] = React.useState<string>('');

    const toastMessageTriggers: ToastMessageTrigger[] = useSelector(selectors.toastMessageTriggers);

    React.useEffect(() => {
        if (navIsOpen && pathname !== lastPath) {
            toggleNav(false);
            setLastPath(pathname);
        }
    }, [pathname]);

    React.useEffect(() => {
        if (toastMessageTriggers.length) {
            const openConversationTriggers = toastMessageTriggers.filter(
                (t: ToastMessageTrigger) => t.name === ToastMessageTriggers.OPEN_CONVERSATIONS,
            );

            if (openConversationTriggers.length) setRightPanelViewState(2);
        }
    }, [toastMessageTriggers]);

    const closeNavigationPanel = (e) => {
        if (
            // if there is a click outside the navigation panel and the panel buttons,
            navIsOpen &&
            !document.getElementById('navigationPanelButtons')?.contains(e.target) &&
            !document.getElementById('navigationPanel')?.contains(e.target)
        ) {
            // hide the navigation panel
            toggleNav(false);
            document.removeEventListener('click', closeNavigationPanel); // the listener is no longer needed
        }
    };

    React.useEffect(() => {
        if (navIsOpen) {
            //nav panel is closed
            document.addEventListener('click', closeNavigationPanel);
        } else {
            //nav panel is open
            document.removeEventListener('click', closeNavigationPanel);
        }

        return () => {
            document.removeEventListener('click', closeNavigationPanel);
        };
    }, [navIsOpen]);

    const handleNavToggle = (): void => {
        toggleNav(!navIsOpen);
    };

    const closeRightPanel = (e) => {
        if (
            // if there is a click outside the right panel and the panel buttons,
            !document.getElementById('rightPanelButtons')?.contains(e.target) &&
            !document.getElementById('rightPanel')?.contains(e.target)
        ) {
            // hide the right panel
            setRightPanelViewState(0);
            document.removeEventListener('click', closeRightPanel, true); // the listener is no longer needed
        }
    };

    const handleRightPanel = (viewState: number): void => {
        if (rightPanelViewState === viewState) {
            //closes the right panel by clicking right panel buttons
            setRightPanelViewState(0);
            document.removeEventListener('click', closeRightPanel, true); // the listener is no longer needed
        } else {
            setRightPanelViewState(viewState); //opens the right panel
            document.addEventListener('click', closeRightPanel, true); // adds an event listener to detect the first click outside the panel
        }
    };

    const onRightPanelClickXButton = () => {
        setRightPanelViewState(0);
    };

    return (
        <>
            <Header navIsOpen={navIsOpen} toggleNav={handleNavToggle} setRightPanelViewState={handleRightPanel} />
            <RightPanel viewState={rightPanelViewState} onClose={onRightPanelClickXButton} />
            <Body navIsOpen={navIsOpen}>
                <Switch>
                    <Route exact path="/">
                        <Dashboard.Page />
                    </Route>

                    {/* ROUTES FOR MAIN NAVIGATION */}
                    {configurations
                        .filter((config: RouteNavigationConfiguration) => !config.disableFeature.includes('main'))
                        .filter((config: RouteNavigationConfiguration) => !!config.navigation?.main)
                        .map(({ name, navigation }) => (
                            <Route path={navigation.main?.route.url} key={`main-${name.toLowerCase().replace(' ', '-')}`}>
                                {navigation.main?.isAllowed(currentUser) ? (
                                    navigation.main?.route.pageRoot
                                ) : (
                                    <Redirect to="/" />
                                )}
                            </Route>
                        ))}

                    {/* ROUTES FOR RIGHT NAVIGATION */}
                    {configurations
                        .filter((config: RouteNavigationConfiguration) => !config.disableFeature.includes('right'))
                        .filter((config: RouteNavigationConfiguration) => !!config.navigation?.right)
                        .map(({ name, navigation }) => (
                            <Route path={navigation.right?.route.url} key={`right-${name.toLowerCase().replace(' ', '-')}`}>
                                {navigation.right?.isAllowed(currentUser) ? (
                                    navigation.right?.route.pageRoot
                                ) : (
                                    <Redirect to="/" />
                                )}
                            </Route>
                        ))}
                    {/* Redirects - REMOVE 90 Days After Deployment of the News Route Changes*/}
                    <Route exact path="/news/details/:newsItemId">
                        <Redirect to={`/communications${pathname}`} />
                    </Route>
                    <Route path="*">
                        <PageWrapper pageTitle="Not Found">
                            <NoContent message="The page you are looking for cannot be found." />
                        </PageWrapper>
                    </Route>
                </Switch>
            </Body>
        </>
    );
};

export default StandardLayout;

