import { LocationsOccupant } from './LocationsOccupant';

export interface LocationsProperty {
    id: number;
    name: string;
    occupants: LocationsOccupant[];
}
