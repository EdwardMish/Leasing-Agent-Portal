import { DirectoryOccupant } from "./DirectoryOccupant";

export interface DirectoryPropertyWithOccupants {
    id: number;
    name: string;
    occupants: DirectoryOccupant[];
}