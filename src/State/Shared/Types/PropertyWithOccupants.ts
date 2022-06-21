import { PropertyOccupant } from "./PropertyOccupant";

export interface PropertyWithOccupants {
    id: number;
    name: string;
    occupants: PropertyOccupant[];
}