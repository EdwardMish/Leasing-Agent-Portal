import { formatPhone } from './formatPhone';

describe('formatPhone', () => {
    it('should return undefined for NULL', () => {
        expect(formatPhone(null as any)).toBe(undefined);
    });

    it('should return undefined for undefined', () => {
        expect(formatPhone(undefined as any)).toBe(undefined);
    });

    it('should return undefined for non-string value', () => {
        expect(formatPhone((() => { 'hi'; }) as any)).toBe(undefined);
    });

    it('should return original string if it does not contain 10 digits', () => {
        const original = '123456';

        expect(formatPhone(original)).toEqual(original);
    });

    it('should return formatted phone number for 10 digit string', () => {
        const original = '1234567890';

        expect(formatPhone(original)).toEqual('(123) 456-7890');
    });

    it('should return formatted phone from number with country code', () => {
        let original = '+1 555.123.4567';
        expect(formatPhone(original)).toEqual('(555) 123-4567');

        original = '+1-(555)-123-4567';
        expect(formatPhone(original)).toEqual('(555) 123-4567');

        original = '+1 555 1234567';
        expect(formatPhone(original)).toEqual('(555) 123-4567');

        original = '+1(555)1234567';
        expect(formatPhone(original)).toEqual('(555) 123-4567');

        original = '1 (555) 1234567';
        expect(formatPhone(original)).toEqual('(555) 123-4567');

        original = '+15551234567';
        expect(formatPhone(original)).toEqual('(555) 123-4567');

        original = '15551234567';
        expect(formatPhone(original)).toEqual('(555) 123-4567');

        original = '1 555 123 4567';
        expect(formatPhone(original)).toEqual('(555) 123-4567');
    });

    it('should return formatted phone from multiple formats without country code', () => {
        let original = '926.123.4567';
        expect(formatPhone(original)).toEqual('(926) 123-4567');

        original = '(926) 1234567';
        expect(formatPhone(original)).toEqual('(926) 123-4567');

        original = '9261234567';
        expect(formatPhone(original)).toEqual('(926) 123-4567');

        original = '926 1234567';
        expect(formatPhone(original)).toEqual('(926) 123-4567');

        original = '(926)123-4567';
        expect(formatPhone(original)).toEqual('(926) 123-4567');

        original = '(926) 123-4567';
        expect(formatPhone(original)).toEqual('(926) 123-4567');

        original = '926 123 4567';
        expect(formatPhone(original)).toEqual('(926) 123-4567');

        original = '926-123-4567';
        expect(formatPhone(original)).toEqual('(926) 123-4567');
    });
});
