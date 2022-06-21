import GET from 'API/utils/GET';
import { InspectionSummary } from '../InspectionsTypes/InspectionSummary';

const getDraftInspections = (): Promise<InspectionSummary[]> =>
    GET.wrapper<InspectionSummary[]>(`${API_ROOT}/inspections/drafts`);

export default getDraftInspections;
