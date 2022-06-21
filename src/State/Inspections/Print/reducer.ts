import { InspectionsPrinterActions, InspectionsPrintActionTypes } from './actions';
import { PrinterStatus } from './Types';

const initialState: PrinterStatus = { readyToPrint: false };

export default function inspectionsPrinterReducer(
    state: PrinterStatus = initialState,
    action: InspectionsPrintActionTypes
): PrinterStatus {
    switch (action.type) {
        case InspectionsPrinterActions.UPDATE_PRINTER_STATUS: {
            const status = action.payload;

            return {
                ...state,
                readyToPrint: status,
            };
        }
        default:
            return state;
    }
}
