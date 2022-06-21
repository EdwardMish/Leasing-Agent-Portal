import { OccupantAddress } from "./OccupantAddress";

export interface Occupant {
    id: number
    name: string;
    setup: boolean;
    phone: string;
    propertyId: number;
    propertyName: string;
    physicalAddress: OccupantAddress;
    mailingAddress: OccupantAddress;
}