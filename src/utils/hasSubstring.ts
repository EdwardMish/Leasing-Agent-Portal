export const hasSubstring = (str: string, subStr: string): boolean => new RegExp(subStr.trim(), 'gi').test(str);
