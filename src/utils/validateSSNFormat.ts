import { hasValidRecord } from './hasValidRecord';

export const SSN_REGEXP = /^\d{3}-\d{2}-\d{4}$/;
export const validateSSNFormat = (ssn: string) => hasValidRecord(ssn) && SSN_REGEXP.test(ssn);
