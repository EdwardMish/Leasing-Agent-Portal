import { RouteNavigationConfiguration } from '../Core/Types/RouteNavigationConfiguration';

import Account from './Account';
import Administration from './Administration';
import Business from './Business';
import Communications from './Communications';
import Conversations from './Conversations';
import Directory from './Directory';
import Documents from './Documents';
import FAQs from './FAQs';
import Inspections from './Inspections';
import Invoices from './Invoices';
import Leasing from './Leasing';
import Locations from './Locations';
import Reports from './Reports';
import Requests from './Requests';
import Sales from './Sales';
import Tasks from './Tasks';

// Order of these items dictate their location in the left hand navigation.

export const configurations: RouteNavigationConfiguration[] = [
    // Main Navigation
    Invoices.configuration,
    Documents.configuration,
    Requests.configuration,
    Sales.configuration,
    Communications.configuration,
    Communications.newsConfiguration,
    Inspections.configuration,
    Leasing.configuration,
    Business.configuration,
    Directory.configuration,
    Locations.configuration,
    Reports.configuration,
    FAQs.configuration,
    Administration.configuration,

    // Right Navigation (User Panel)
    Account.configuration,

    // Top Navigation
    Tasks.configuration,
    Conversations.configuration,
];
