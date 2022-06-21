import { hasValidRecord } from './hasValidRecord';

export const TELEPHONE_REGEXP = "\\+?(\\d{1,3})?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?:[-.x ]*(\\d+))?";

export const formatPhone = (phone: string): string | undefined => {

    if (!hasValidRecord(phone)) return;

    const telephoneRegEx = new RegExp(TELEPHONE_REGEXP);

    if (telephoneRegEx.test(phone)) {
        const regExArray: RegExpExecArray | null = telephoneRegEx.exec(phone);

        if (regExArray) {
            return `(${regExArray[2]}) ${regExArray[3]}-${regExArray[4]}`;
        }
    }

    return phone;
};
