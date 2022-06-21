import PATCH from 'API/utils/PATCH';

const completeInspection = (inspectionId: number): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/inspections/${inspectionId}/complete`);

export default completeInspection;
