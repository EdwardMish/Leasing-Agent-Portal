import { OccupantAddress } from '../State/Shared/Types/OccupantAddress';

import { formatCityAndState } from './formatCityAndState';

describe('formatCityAndState', () => {
    it('should return formatted city and state when set', () => {
        const address: OccupantAddress = {
            city: 'Somewheresville',
            state: 'OK',
        } as OccupantAddress;

        expect(formatCityAndState(address)).toEqual('Somewheresville, OK');
    });

    it('should return just city with no state property', () => {
        const address: OccupantAddress = {
            city: 'Somewheresville',
        } as OccupantAddress;

        expect(formatCityAndState(address)).toEqual('Somewheresville');
    });

    it('should return just city with an empty state value', () => {
        const address: OccupantAddress = {
            city: 'Somewheresville',
            state: '',
        } as OccupantAddress;

        expect(formatCityAndState(address)).toEqual('Somewheresville');
    });

    it('should return just state with no city property', () => {
        const address: OccupantAddress = {
            state: 'OK',
        } as OccupantAddress;

        expect(formatCityAndState(address)).toEqual('OK');
    });

    it('should return just state with an empty city value', () => {
        const address: OccupantAddress = {
            city: '',
            state: 'OK',
        } as OccupantAddress;

        expect(formatCityAndState(address)).toEqual('OK');
    });

    it('should return an empty string with no properties', () => {
        const address: OccupantAddress = {} as OccupantAddress;

        expect(formatCityAndState(address)).toEqual('');
    });

    it('should return an empty string with empty values', () => {
        const address: OccupantAddress = {
            city: '',
            state: '',
        } as OccupantAddress;

        expect(formatCityAndState(address)).toEqual('');
    });
});
