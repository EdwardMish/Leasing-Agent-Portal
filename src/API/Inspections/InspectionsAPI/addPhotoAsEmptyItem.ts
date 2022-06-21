import POST from 'API/utils/POST';
import { InspectionCategories } from 'State/Inspections/Types/InspectionCategories';

const addPhotoAsEmptyItem = (
    inspectionId: number | string,
    image: File,
    options?: {
        interactionId?: number | string;
        categoryId?: number;
    },
): Promise<{ itemId: number; imageId: string }> =>
    POST.postFormData(`${API_ROOT}/inspections/${inspectionId}/items`, {
        image,
        categoryId: options?.categoryId ? `${options.categoryId}` : `${InspectionCategories.Property}`,
        followUp: 'false',
        ...(!!options?.interactionId && { interactionId: `${options.interactionId}` }),
    });

export default addPhotoAsEmptyItem;
