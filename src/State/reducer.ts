import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { State } from '../Types/State';

import { alertsReducer } from './Alerts/reducer';
import { businessReducer } from './Business/reducer';
import { contactsReducer } from './Contacts/reducer';
import { conversationsReducer } from './Conversations/reducer';
import { currentUserReducer } from './CurrentUser/reducer';
import { directoryReducer } from './Directory/reducer';
import { documentsReducer } from './Documents/reducer';
import { emergencyNewsItemsReducer } from './EmergencyNewsItems/reducer';
import { featureFlagsReducer } from './FeatureFlags/reducer';
import { globalMessageReducer } from './GlobalMessages/reducer';
import inspectionsAppReducer from './Inspections/App/reducer';
import inspectionsFeatureReducer from './Inspections/Feature/reducer';
import inspectionsPrintReducer from './Inspections/Print/reducer';
import { leasingReducer } from './Leasing/reducer';
import { locationsReducer } from './Locations/reducer';
import { notificationsReducer } from './Notifications/reducer';
import { occupantsReducer } from './Occupants/reducer';
import { propertiesReducer } from './Properties/reducer';
import { propertyTenantResolutionReducer } from './PropertyTenantResolution/reducer';
import { requestsReducer } from './Requests/reducer';
import { salesReducer } from './Sales/reducer';
import { spacesReducer } from './Spaces/reducer';
import { tasksReducer } from './Tasks/reducer';
import { toastMessageReducer } from './ToastMessages/reducer';
import { usersReducer } from './Users/reducer';
import { welcomeReducer } from './Welcome/reducer';
import { listWrapperReducer } from './ListWrapper';

interface CompositionWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare const window: CompositionWindow;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducer = combineReducers<State>({
    alerts: alertsReducer,
    business: businessReducer,
    contacts: contactsReducer,
    conversations: conversationsReducer,
    currentUser: currentUserReducer,
    directory: directoryReducer,
    documents: documentsReducer,
    emergencyNewsItems: emergencyNewsItemsReducer,
    featureFlags: featureFlagsReducer,
    globalMessages: globalMessageReducer,
    inspectionsApplication: inspectionsAppReducer,
    inspectionsFeature: inspectionsFeatureReducer,
    inspectionsPrinter: inspectionsPrintReducer,
    leasing: leasingReducer,
    listWrapper: listWrapperReducer,
    locations: locationsReducer,
    notifications: notificationsReducer,
    occupants: occupantsReducer,
    properties: propertiesReducer,
    propertyTenantResolution: propertyTenantResolutionReducer,
    requests: requestsReducer,
    sales: salesReducer,
    spaces: spacesReducer,
    tasks: tasksReducer,
    toastMessages: toastMessageReducer,
    users: usersReducer,
    welcome: welcomeReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

