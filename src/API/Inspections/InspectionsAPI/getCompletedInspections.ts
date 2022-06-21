import GET from 'API/utils/GET';
import { InspectionSummary } from '../InspectionsTypes/InspectionSummary';

const getCompletedInspections = (): Promise<InspectionSummary[]> =>
    GET.wrapper<InspectionSummary[]>(`${API_ROOT}/inspections/completed`);

export default getCompletedInspections;
