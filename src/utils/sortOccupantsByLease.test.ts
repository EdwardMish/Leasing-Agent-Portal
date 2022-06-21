import { Occupants } from '../State';

import sortOccupantsByLease from './sortOccupantsByLease';

type Occupant = Occupants.Types.Occupant

describe('sortOccupantsByLease', () => {
    it('should set lease dates that are in the past into \'1\' property', () => {
        const pastOccupant = { leaseEnd: '1900-01-01 00:00:00.0000000' } as Occupant;

        expect(sortOccupantsByLease([pastOccupant])[1].length).toEqual(1);
    });

    it('should set lease dates that are in the future into \'2\' property', () => {
        const futureOccupant = { leaseStart: '2025-01-01 00:00:00.0000000' } as Occupant;

        expect(sortOccupantsByLease([futureOccupant])[2].length).toEqual(1);
    });

    it('should set lease dates that are not in the past or future into \'0\' property', () => {
        const currentOccupant = {
            leaseEnd: '2025-01-01 00:00:00.0000000',
            leaseStart: '2020-01-01 00:00:00.0000000',
        } as Occupant;

        expect(sortOccupantsByLease([currentOccupant])[0].length).toEqual(1);
    });

    it('should sort an array of occupants according to lease dates', () => {
        const pastOccupant = { leaseEnd: '1900-01-01 00:00:00.0000000' } as Occupant;
        const futureOccupant = { leaseStart: '2025-01-01 00:00:00.0000000' } as Occupant;
        const currentOccupant = {
            leaseEnd: '2025-01-01 00:00:00.0000000',
            leaseStart: '2020-01-01 00:00:00.0000000',
        } as Occupant;

        const sorted = sortOccupantsByLease([pastOccupant, futureOccupant, currentOccupant]);

        expect(Object.values(sorted).every((o) => o.length === 1)).toBeTruthy();
    });

    it('should handle multiple occupants with appropriate lease dates', () => {
        const pastOccupantOne = { leaseEnd: '1900-01-01 00:00:00.0000000' } as Occupant;
        const pastOccupantTwo = { leaseEnd: '1900-01-01 00:00:00.0000000' } as Occupant;
        const futureOccupantOne = { leaseStart: '2025-01-01 00:00:00.0000000' } as Occupant;
        const futureOccupantTwo = { leaseStart: '2025-01-01 00:00:00.0000000' } as Occupant;
        const currentOccupantOne = {
            leaseEnd: '2025-01-01 00:00:00.0000000',
            leaseStart: '2020-01-01 00:00:00.0000000',
        } as Occupant;
        const currentOccupantTwo = {
            leaseEnd: '2025-01-01 00:00:00.0000000',
            leaseStart: '2020-01-01 00:00:00.0000000',
        } as Occupant;

        const sorted = sortOccupantsByLease([
            futureOccupantOne,
            pastOccupantOne,
            currentOccupantOne,
            futureOccupantTwo,
            pastOccupantTwo,
            currentOccupantTwo,
        ]);

        expect(Object.values(sorted).every((o) => o.length === 2)).toBeTruthy();
    });
});
