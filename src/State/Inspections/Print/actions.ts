
export enum InspectionsPrinterActions {
    UPDATE_PRINTER_STATUS = 'INSPECTIONS_FEATURE_UPDATE_PRINTER_STATUS',
}

interface UpdatePrinterStatus {
    type: typeof InspectionsPrinterActions.UPDATE_PRINTER_STATUS;
    payload: boolean;
}

export type InspectionsPrintActionTypes = UpdatePrinterStatus