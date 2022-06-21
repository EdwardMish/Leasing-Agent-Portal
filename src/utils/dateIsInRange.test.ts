import { dateIsInRange } from './dateIsInRange';

describe('dateIsInRange', () => {
    it('should return a boolean', () => {
        expect(typeof dateIsInRange(new Date())).toBe('boolean');
    });

    it('should accept an optional date to define the upper range', () => {
        const c = new Date('1995-1-1');

        expect(typeof dateIsInRange(new Date(), c)).toBe('boolean');
    });

    it('should return false for dates in future years', () => {
        const futureDate = new Date(new Date().setFullYear(2050));

        expect(dateIsInRange(futureDate)).toEqual(false);
    });

    describe('When the years are the same,', () => {
        it('should return false for future months', () => {
            const lease = new Date('2018-12-1');
            const upper = new Date('2018-1-1');

            expect(dateIsInRange(lease, upper)).toEqual(false);
        });

        it('should return true for the same month', () => {
            const lease = new Date('2018-12-15');
            const upper = new Date('2018-12-25');

            expect(dateIsInRange(lease, upper)).toEqual(true);
        });

        it('should return true for past months', () => {
            const lease = new Date('2018-1-1');
            const upper = new Date('2018-12-1');

            expect(dateIsInRange(lease, upper)).toEqual(true);
        });
    });

    describe('When the date in question is from a past year', () => {
        it('should return false if the year is greater than 5 years from today', () => {
            const sixYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 6));

            expect(dateIsInRange(sixYearsAgo)).toEqual(false);
        });

        it('should return true if the date is within 5 years from today', () => {
            const getYears = (n: number): Date => new Date(new Date().setFullYear(new Date().getFullYear() - n));

            expect(
                [5, 4, 3, 2, 1]
                    .map((n) => dateIsInRange(getYears(n)))
                    .every((v) => v === true),
            ).toEqual(true);
        });
    });
});
