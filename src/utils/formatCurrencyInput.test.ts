import { formatCurrencyInput } from './formatCurrencyInput';

describe('formatCurrencyInput', () => {
    it('should return a number', () => {
        expect(typeof formatCurrencyInput('123456')).toEqual('number');
    });

    it('should return an int adjusted for DOLLARSCENTS', () => {
        // The DB stores the values as DOLLARSCENTS
        // $123456.00 should be 12345600
        expect(formatCurrencyInput('123456')).toEqual(12345600);
    });

    it('should strip white space from input', () => {
        expect(formatCurrencyInput('    123456      ')).toEqual(12345600);
    });

    it('should remove dollar signs from input', () => {
        expect(formatCurrencyInput('$123456')).toEqual(12345600);
    });

    it('should strip non-numeric values from input', () => {
        expect(formatCurrencyInput('$1abc2def3-_?45*/\/6')).toEqual(12345600);
    });

    it('should adjust output for single value following decimal', () => {
        expect(formatCurrencyInput('123456.1')).toEqual(12345610);
    });

    it('should adjust output for two values following decimal', () => {
        expect(formatCurrencyInput('123456.11')).toEqual(12345611);
    });
});
