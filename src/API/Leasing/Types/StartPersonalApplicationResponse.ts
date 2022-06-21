import { Bureau } from "API/Leasing/Types/Bureau";

export interface StartPersonalApplicationResponse {
    creditCheckSuccessful: boolean;
    bureau?: Bureau;
}
