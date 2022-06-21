import { InteractionItem } from '../InteractionItem';
import { Note } from '../Note';
import { Photo } from '../Photo';

export default (inspectionItem: Note | Photo | InteractionItem): inspectionItem is InteractionItem => {
    if (!!(inspectionItem as Photo).imageId?.length || (inspectionItem as Photo).file !== undefined)
        return false;

    if ((inspectionItem as Note).note !== undefined && (inspectionItem as Note).note !== null) {
        const { note = '' } = inspectionItem as Note;

        if (note.length > 0) return false;
    }

    return Object.hasOwnProperty.call(inspectionItem, 'occupantId');
};
