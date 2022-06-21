import { StateIdentificationType } from './StateIdentification';
import { PassportIdentificationType } from './PassportIdentification';

type IdentificationType = StateIdentificationType & PassportIdentificationType;

export default IdentificationType;
