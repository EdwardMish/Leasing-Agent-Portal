import { DirectoryOccupant } from './DirectoryOccupant';

export interface DirectoryProperty {
    id: number;
    name: string;
    occupants: DirectoryOccupant[];
}
