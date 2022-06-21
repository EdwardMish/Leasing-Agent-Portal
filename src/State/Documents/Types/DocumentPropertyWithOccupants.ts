import { DocumentOccupant } from "./DocumentOccupant";

export interface DocumentPropertyWithOccupants {
    id: number;
    name: string;
    occupants: DocumentOccupant[];
}