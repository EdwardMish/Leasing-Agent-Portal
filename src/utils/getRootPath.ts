export const getRootPath = (path: string, fallback?: string): string => `/${path.split('/')[1]}` || fallback || '/';
