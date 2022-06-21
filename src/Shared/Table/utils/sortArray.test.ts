import { SortDirection } from '../Types';
import { sortArray } from '.';

describe('sort utility tests', () => {
    it('does not operate on empty arrays', () => {
        expect(() => sortArray([], 'id')).not.toThrow();
    });

    it('should sort numeric columns ascending by default', () => {
        const unsortedArray = [{ id: 33 }, { id: 22 }, { id: 11 }, { id: 3 }, { id: 10 }, { id: 1 }];
        const sortedArray = sortArray(unsortedArray, 'id');

        expect(sortedArray[0].id).toBe(1);
        expect(sortedArray[1].id).toBe(3);
        expect(sortedArray[2].id).toBe(10);
        expect(sortedArray[3].id).toBe(11);
        expect(sortedArray[4].id).toBe(22);
        expect(sortedArray[5].id).toBe(33);
    });

    it('should sort numeric columns descending when specified', () => {
        const initialArray = [{ id: 1 }, { id: 10 }, { id: 11 }, { id: 22 }, { id: 33 }, { id: 3 }];
        const sortedArray = sortArray(initialArray, 'id', SortDirection.DESC);

        expect(sortedArray[0].id).toBe(33);
        expect(sortedArray[1].id).toBe(22);
        expect(sortedArray[2].id).toBe(11);
        expect(sortedArray[3].id).toBe(10);
        expect(sortedArray[4].id).toBe(3);
        expect(sortedArray[5].id).toBe(1);
    });

    it('should sort string columns ascending by default', () => {
        const unsortedArray = [{ id: 'hello' }, { id: 'world' }, { id: 'c' }, { id: 'b' }, { id: 'a' }];
        const sortedArray = sortArray(unsortedArray, 'id');

        expect(sortedArray[0].id).toBe('a');
        expect(sortedArray[1].id).toBe('b');
        expect(sortedArray[2].id).toBe('c');
        expect(sortedArray[3].id).toBe('hello');
        expect(sortedArray[4].id).toBe('world');
    });

    it('should sort string columns descending when specified', () => {
        const initialArray = [{ id: 'hello' }, { id: 'world' }, { id: 'a' }, { id: 'b' }, { id: 'c' }];
        const sortedArray = sortArray(initialArray, 'id', SortDirection.DESC);

        expect(sortedArray[0].id).toBe('world');
        expect(sortedArray[1].id).toBe('hello');
        expect(sortedArray[2].id).toBe('c');
        expect(sortedArray[3].id).toBe('b');
        expect(sortedArray[4].id).toBe('a');
    });

    it('should sort alphaNumeric columns in an expected manner', () => {
        const initialArray = [
            { id: '2019' },
            { id: '2015' },
            { id: '--' },
            { id: '2020' },
            { id: '2015' },
            { id: '--' },
            { id: '1980' },
        ];
        const sortedArray = sortArray(initialArray, 'id');

        expect(sortedArray[0].id).toBe('--');
        expect(sortedArray[1].id).toBe('--');
        expect(sortedArray[2].id).toBe('1980');
        expect(sortedArray[3].id).toBe('2015');
        expect(sortedArray[4].id).toBe('2015');
        expect(sortedArray[5].id).toBe('2019');
        expect(sortedArray[6].id).toBe('2020');
    });

    it('should sort alphaNumeric columns in an expected manner with null values', () => {
        const initialArray = [
            { id: '2019' },
            { id: '2015' },
            { id: null },
            { id: undefined },
            { id: '2020' },
            { id: '2015' },
            { id: '--' },
            { id: '1980' },
        ];
        const sortedArray = sortArray(initialArray, 'id');

        expect(sortedArray[0].id == null);
        expect(sortedArray[1].id == null);
        expect(sortedArray[2].id).toBe('--');
        expect(sortedArray[3].id).toBe('1980');
        expect(sortedArray[4].id).toBe('2015');
        expect(sortedArray[5].id).toBe('2015');
        expect(sortedArray[6].id).toBe('2019');
        expect(sortedArray[7].id).toBe('2020');
    });
});
