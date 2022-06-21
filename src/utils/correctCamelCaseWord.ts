export const correctCamelCaseWord = (text: string): string => !!text && !!text.length && text.length > 1 && `${text.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}` || '';
