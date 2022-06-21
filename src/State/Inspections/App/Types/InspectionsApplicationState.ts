import { StateRecord } from '../../../../Types';
import { ActiveInspection } from './ActiveInspection';
import { Property } from './Property';

export interface InspectionsApplicationState {
    activeInspection: ActiveInspection;
    properties: StateRecord<Property>;
}
