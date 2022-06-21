import { hasSubstring } from './hasSubstring';

describe('hasSubstring', () => {
    it('should return true for empty values', () => {
        expect(hasSubstring('', '')).toBe(true);
    });

    it('should trim space', () => {
        let str = 'Hi',
            subStr = ' Hi';
        expect(hasSubstring(str, subStr)).toBe(true);

        (str = 'Hi'), (subStr = ' Hi ');
        expect(hasSubstring(str, subStr)).toBe(true);

        (str = 'Hi'), (subStr = 'Hi ');
        expect(hasSubstring(str, subStr)).toBe(true);
    });

    it('should return true for same values', () => {
        let str = 'hello',
            subStr = 'hello';
        expect(hasSubstring(str, subStr)).toBe(true);

        (str = 'HELLO'), (subStr = 'hello');
        expect(hasSubstring(str, subStr)).toBe(true);
    });

    it('should be case-insensitive', () => {
        let str = 'HELLO WORLD',
            subStr = 'hello';
        expect(hasSubstring(str, subStr)).toBe(true);

        (str = 'hello world'), (subStr = 'HELLO');
        expect(hasSubstring(str, subStr)).toBe(true);

        (str = 'hello world'), (subStr = 'hELLO');
        expect(hasSubstring(str, subStr)).toBe(true);

        (str = 'HELLO world'), (subStr = 'Hello');
        expect(hasSubstring(str, subStr)).toBe(true);
    });

    it('should return false when the parent does not contain substring', () => {
        let str = 'HELLO WORLD',
            subStr = 'HHELLO';
        expect(hasSubstring(str, subStr)).toBe(false);

        (str = 'hello world'), (subStr = 'hhello');
        expect(hasSubstring(str, subStr)).toBe(false);

        (str = 'hello world'), (subStr = 'hi');
        expect(hasSubstring(str, subStr)).toBe(false);
    });
});
