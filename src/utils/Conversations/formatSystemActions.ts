import { formatSystemName } from './formatSystemName';

export const formatSystemActions = (message: string): [string, string] => (message.includes('left')
    ? formatSystemName(message, 'left')
    : formatSystemName(message, 'joined'));
