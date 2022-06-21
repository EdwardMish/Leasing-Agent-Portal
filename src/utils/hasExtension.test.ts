import { hasExtension } from './hasExtension';

describe('hasExtension', () => {
    it('should return false for NULL', () => {
        expect(hasExtension(null as any)).toBe(false);
    });

    it('should return false for undefined', () => {
        expect(hasExtension(undefined as any)).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(hasExtension('' as any)).toBe(false);
    });

    it('should return false for non-string value', () => {
        expect(
            hasExtension((() => {
                'hi';
            }) as any)
        ).toBe(false);
    });

    it('should return false from string value that ends with a dot', () => {
        let original = 'file.';
        expect(hasExtension(original)).toBe(false);

        original = 'file.extensiontype.';
        expect(hasExtension(original)).toBe(false);

        original = 'file$#*.';
        expect(hasExtension(original)).toBe(false);

        original = '...';
        expect(hasExtension(original)).toBe(false);
    });

    it('should return true from string value that ends with a dot followed by at least one character', () => {
        let original = 'file.extensiontype';
        expect(hasExtension(original)).toBe(true);

        original = 'file.extensiontype.extensiontype';
        expect(hasExtension(original)).toBe(true);

        original = 'file$#*.extensiontype';
        expect(hasExtension(original)).toBe(true);

        original = '...extensiontype';
        expect(hasExtension(original)).toBe(true);
    });
});
