import { InteractionItem } from '../InteractionItem';
import { InspectionItem } from '../InspectionItem';

export default (inspectionItem: InspectionItem | InteractionItem): inspectionItem is InspectionItem => {
    return !(Object.hasOwnProperty.call(inspectionItem, 'occupantId'));
};
