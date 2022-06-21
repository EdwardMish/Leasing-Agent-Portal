// No specified extension type
// Return true for all string values that end with a dot followed by at least one character
import { hasValidRecord } from './hasValidRecord';

export const hasExtension = (fileName: string): boolean =>
    hasValidRecord(fileName) && fileName.search(/\.[0-9a-z]+$/i) !== -1;
