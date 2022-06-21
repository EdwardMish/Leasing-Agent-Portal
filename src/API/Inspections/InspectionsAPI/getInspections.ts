import GET from 'API/utils/GET';
import { InspectionSummary } from '../InspectionsTypes/InspectionSummary';

const getInspections = (): Promise<InspectionSummary[]> => GET.wrapper<InspectionSummary[]>(`${API_ROOT}/inspections`);

export default getInspections;
