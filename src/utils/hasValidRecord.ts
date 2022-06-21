// Some properties are written as 'NULL'
// Phone number, specifically
export const hasValidRecord = (val: string): boolean => !!val && typeof val === 'string' && val !== 'NULL';
