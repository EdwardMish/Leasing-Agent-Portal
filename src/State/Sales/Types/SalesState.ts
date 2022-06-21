import { SalesSubmittal, StateRecord } from "../../../Types";
import { Occupant } from "./Occupant";

export interface SalesState {
    occupants: StateRecord<Occupant>;
    occupantSalesLoaded: number[];
    submittals: Record<number, SalesSubmittal[]>;
}