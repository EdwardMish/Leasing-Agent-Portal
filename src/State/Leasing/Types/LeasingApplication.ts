import { Address } from './Address';
import IdentificationType from './IdentificationType';
import { PersonalInformation } from './PersonalInformation';

export interface LeasingApplication {
    id: number;
    personalInformation?: PersonalInformation;
    address?: Address;
    identification?: IdentificationType;
    started: boolean;
}
