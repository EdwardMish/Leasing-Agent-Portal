import { Occupant } from './Occupant';

export interface PropertyWithOccupants {
    id: number;
    name: string;
    occupants: Occupant[];
}
