import { GET } from '../../../API/utils';

export namespace IDPlansAPI {
    const ROOT_URL = `${API_ROOT}/id-plans`;

    /* Electric */
    export interface ElectricResponse {
        meterNumber: string;
        space: string;
    }

    export enum ElectricColumns {
        meterNumber = 'meterNumber',
        space = 'space',
    }

    export const getElectric = (propertyId: number) =>
        GET.wrapper<ElectricResponse[]>(`${ROOT_URL}/properties/${propertyId}/electric`);

    /* Water */
    export interface WaterResponse {
        meterNumber: string;
        space: string;
    }

    export enum WaterColumns {
        meterNumber = 'meterNumber',
        space = 'space',
    }

    export const getWater = (propertyId: number) =>
        GET.wrapper<WaterResponse[]>(`${ROOT_URL}/properties/${propertyId}/water`);

    /* Gas */
    export interface GasResponse {
        meterNumber: string;
        space: string;
    }

    export enum GasColumns {
        meterNumber = 'meterNumber',
        space = 'space',
    }

    export const getGas = (propertyId: number) => GET.wrapper<GasResponse[]>(`${ROOT_URL}/properties/${propertyId}/gas`);

    /* HVAC */
    export interface HVACResponse {
        manufacturer: string;
        model: string;
        tonnage: string;
        serialNumber: string;
        year: string;
        space: string;
    }

    export enum HVACColumns {
        manufacturer = 'manufacturer',
        model = 'model',
        tonnage = 'tonnage',
        serialNumber = 'serialNumber',
        year = 'year',
        space = 'space',
    }

    export const getHVAC = (propertyId: number) => GET.wrapper<HVACResponse[]>(`${ROOT_URL}/properties/${propertyId}/hvac`);

    /* Parking */
    export interface ParkingResponse {
        numberOfSpaces: number;
        parkingType: string;
    }

    export enum ParkingColumns {
        numberOfSpaces = 'numberOfSpaces',
        parkingType = 'parkingType',
    }

    export const getParking = (propertyId: number) =>
        GET.wrapper<ParkingResponse[]>(`${ROOT_URL}/properties/${propertyId}/parking`);

    /* Redirect */
    export interface RedirectResponse {
        link: string;
    }

    export const getRedirectLink = (propertyId: number | string): Promise<RedirectResponse> =>
        GET.wrapper<RedirectResponse>(`${ROOT_URL}/redirect/${propertyId}`);
}
