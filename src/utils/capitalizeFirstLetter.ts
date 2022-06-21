export const capitalizeFirstLetter = (text: string): string => !!text && !!text.length && text.length > 1 && `${text[0].toUpperCase()}${text.substring(1)}` || '';
