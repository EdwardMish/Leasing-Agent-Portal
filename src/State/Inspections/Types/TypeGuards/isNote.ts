import { InspectionItem } from '../InspectionItem';
import { Note } from '../Note';
import { Photo } from '../Photo';

export default (inspectionItem: InspectionItem): inspectionItem is Note => {
    // Verify is not photo
    if (!!inspectionItem.imageId?.length || (inspectionItem as Photo).file !== undefined) return false;

    // Verify is not null or undefined
    if (!(inspectionItem as Note).note) return false;

    const { note = '' } = inspectionItem;

    return note.length > 0;
};
