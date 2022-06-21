import { paginateCollection } from './paginateCollection';

describe('paginateCollection', () => {
    it('should return an object', () => {
        expect(typeof paginateCollection([], 1)).toEqual('object');
    });

    it('should return the same number of items as was passed in', () => {
        const testTen: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const paginated = paginateCollection(testTen, 100);

        expect(Object.values(paginated['1']).length).toEqual(10);
    });

    it('should return an expected number of pages', () => {
        const testSixteen: number[] = [];

        for (let current: number = 0; current < 16; current++) {
            testSixteen.push(current);
        }

        const fourPages = paginateCollection(testSixteen, 4);
        const eightPages = paginateCollection(testSixteen, 2);

        expect(Object.keys(fourPages)).toEqual(['1', '2', '3', '4']);
        expect(Object.keys(eightPages)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
    });

    it('should return an expected number of items per page', () => {
        const testTwenty: number[] = [];

        for (let current: number = 0; current < 20; current++) {
            testTwenty.push(current);
        }

        const fourPages = paginateCollection(testTwenty, 5);
        const tenPages = paginateCollection(testTwenty, 2);

        expect(Object.values(fourPages).every((i) => i.length === 5)).toBe(true);
        expect(Object.values(tenPages).every((i) => i.length === 2)).toBe(true);
    });
});
