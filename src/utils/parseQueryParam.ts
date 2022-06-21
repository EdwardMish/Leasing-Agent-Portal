export const parseQueryParam = (queryString: string): number => parseInt(queryString.replace('?', '').split('=')[1]);
