import GET from 'API/utils/GET';
import { Inspection } from '../InspectionsTypes/Inspection';

const getInspection = (inspectionId: number | string): Promise<Inspection> =>
    GET.wrapper<Inspection>(`${API_ROOT}/inspections/${inspectionId}`);

export default getInspection;
