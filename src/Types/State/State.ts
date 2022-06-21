import { News } from '../../API/News/Types/News';

import { AlertsState } from '../../State/Alerts/Types/AlertsState';
import { BusinessState } from '../../State/Business/Types/BusinessState';
import { ContactState } from '../../State/Contacts/Types/ContactState';
import { ConversationsState } from '../../State/Conversations/Types/ConversationsState';
import { CurrentUserState } from '../../State/CurrentUser/Types/CurrentUserState';
import { DirectoryState } from '../../State/Directory/Types/DirectoryState';
import { DocumentState } from '../../State/Documents/Types/DocumentState';
import { FeatureFlagsState } from '../../State/FeatureFlags/Types/FeatureFlagsState';
import { InspectionsApplicationState } from '../../State/Inspections/App/Types/InspectionsApplicationState';
import { InspectionsFeatureState } from '../../State/Inspections/Feature/Types/InspectionsFeatureState';
import { PrinterStatus } from '../../State/Inspections/Print/Types';
import { LeasingState } from '../../State/Leasing/Types/LeasingState';
import { LocationsState } from '../../State/Locations/Types/LocationsState';
import { NotificationsState } from '../../State/Notifications/Types/NotificationsState';
import { OccupantState } from '../../State/Occupants/Types/OccupantState';
import { PropertyState } from '../../State/Properties/Types/PropertyState';
import { PropertyTenantResolutionState } from '../../State/PropertyTenantResolution/Types/PropertyTenantResolutionState';
import { RequestState } from '../../State/Requests/Types/RequestState';
import { SalesState } from '../../State/Sales/Types/SalesState';
import { SpacesState } from '../../State/Spaces/Types/SpacesState';
import { TasksState } from '../../State/Tasks/Types/TasksState';
import { ToastMessageState } from '../../State/ToastMessages/Types/ToastMessageState';
import { WelcomeState } from '../../State/Welcome/Types/WelcomeState';
import { ListWrapper } from 'State/ListWrapper';

import { LoadStatus } from '../AsyncState';

import { GlobalMessage } from '../InterfaceMessages';
import { User } from '../User';

export interface GlobalMessageState {
    messages: Record<number, GlobalMessage>;
}

export interface UsersState {
    loadStatus: LoadStatus;
    users: Record<number, User>;
    usersSearchList: number[];
}

export interface EmergencyNewsItemsState {
    currentNewsItem: number;
    newsItems: News[];
    newsItemsLoadStatus: LoadStatus;
}

export interface State {
    alerts: AlertsState;
    business: BusinessState;
    contacts: ContactState;
    conversations: ConversationsState;
    currentUser: CurrentUserState;
    directory: DirectoryState;
    documents: DocumentState;
    emergencyNewsItems: EmergencyNewsItemsState;
    featureFlags: FeatureFlagsState;
    globalMessages: GlobalMessageState;
    inspectionsApplication: InspectionsApplicationState;
    inspectionsFeature: InspectionsFeatureState;
    inspectionsPrinter: PrinterStatus;
    leasing: LeasingState;
    listWrapper: ListWrapper;
    locations: LocationsState;
    notifications: NotificationsState;
    occupants: OccupantState;
    properties: PropertyState;
    propertyTenantResolution: PropertyTenantResolutionState;
    requests: RequestState;
    sales: SalesState;
    spaces: SpacesState;
    tasks: TasksState;
    toastMessages: ToastMessageState;
    users: UsersState;
    welcome: WelcomeState;
}
