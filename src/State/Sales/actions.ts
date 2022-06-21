import { SalesSubmittal, SalesSubmittalStatus, Note } from '../../Types'
import { Occupant } from './Types';

export enum SalesActions {
    LOAD_SALES_OCCUPANTS = 'LOAD_SALES_OCCUPANTS',
    SET_SALES_OCCUPANTS = 'SET_SALES_OCCUPANTS',
    LOAD_OCCUPANT_SALES = 'LOAD_OCCUPANT_SALES',
    SET_OCCUPANT_SALES = 'SET_OCCUPANT_SALES',
    CLEAR_FAILED_LOAD = 'CLEAR_FAILED_LOAD',
    ADD_MONTHLY_SUBMITTAL = 'ADD_MONTHLY_SUBMITTAL',
    ADD_YEARLY_SUBMITTAL = 'ADD_YEARLY_SUBMITTAL',
    UPDATE_SUBMITTAL = 'UPDATE_SUBMITTAL',
    UPDATE_SUBMITTAL_STATUS = 'UPDATE_SUBMITTAL_STATUS',
    ADD_NOTE_TO_SALES = 'ADD_NOTE_TO_SALES',
}

type OccupantId = number

interface LoadSalesOccupants {
    type: typeof SalesActions.LOAD_SALES_OCCUPANTS;
}

interface SetSalesOccupants {
    type: typeof SalesActions.SET_SALES_OCCUPANTS;
    payload: Occupant[];
}

interface LoadOccupantSales {
    type: typeof SalesActions.LOAD_OCCUPANT_SALES;
    payload: OccupantId;
}

interface SetOccupantSales {
    type: typeof SalesActions.SET_OCCUPANT_SALES;
    payload: {
        submittals: SalesSubmittal[];
        occupantId: OccupantId;
    }
}

interface ClearFailedLoad {
    type: typeof SalesActions.CLEAR_FAILED_LOAD;
    payload: OccupantId;
}

interface AddMonthlySubmittal {
    type: typeof SalesActions.ADD_MONTHLY_SUBMITTAL;
    payload: {
        occupantId: OccupantId;
        submittal: SalesSubmittal;
    }
}

interface AddYearlySubmittal {
    type: typeof SalesActions.ADD_YEARLY_SUBMITTAL;
    payload: {
        occupantId: OccupantId;
        submittal: SalesSubmittal;
    }
}

interface UpdateSubmittal {
    type: typeof SalesActions.UPDATE_SUBMITTAL;
    payload: {
        occupantId: OccupantId;
        year: number;
        month: number;
        salesAmount: number;
        status: SalesSubmittalStatus;
    }
}

interface UpdateSubmittalStatus {
    type: typeof SalesActions.UPDATE_SUBMITTAL_STATUS;
    payload: {
        occupantId: OccupantId;
        year: number;
        month: number;
        status: SalesSubmittalStatus;
    }
}

interface AddNoteToSales {
    type: typeof SalesActions.ADD_NOTE_TO_SALES;
    payload: {
        occupantId: OccupantId;
        year: number;
        month: number;
        note: Note;
    }
}

export type SalesActionTypes = LoadSalesOccupants
    | SetSalesOccupants
    | LoadOccupantSales
    | SetOccupantSales
    | ClearFailedLoad
    | AddMonthlySubmittal
    | AddYearlySubmittal
    | UpdateSubmittal
    | UpdateSubmittalStatus
    | AddNoteToSales;