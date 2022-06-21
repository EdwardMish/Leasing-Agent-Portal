import { emailValidator } from './emailValidator';

describe('emailValidator', () => {
    it('should return true for a valid email', () => {
        expect(emailValidator('testemail@email.com')).toBe(true);
    });

    it('should return false for an invalid email', () => {
        expect(emailValidator('testemail')).toBe(false);
    });

    it('should return false if passed an incorrect type', () => {
        expect(emailValidator(123 as any)).toBe(false);
        expect(emailValidator(null as any)).toBe(false);
        expect(emailValidator(undefined as any)).toBe(false);
        expect(emailValidator((() => { 'function here'; }) as any)).toBe(false);
        expect(emailValidator([] as any)).toBe(false);
    });
});
