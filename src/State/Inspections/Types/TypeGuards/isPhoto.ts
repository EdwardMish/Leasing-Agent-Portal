import { InspectionItem } from '../InspectionItem';
import { Photo } from '../Photo';

export default (inspectionItem: InspectionItem): inspectionItem is Photo => (inspectionItem as Photo).file !== undefined
    || !!(inspectionItem.imageId?.length);
