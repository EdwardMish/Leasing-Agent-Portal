import DELETE from 'API/utils/DELETE';

const deleteInspection = (inspectionId: number | string): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/inspections/${inspectionId}`);

export default deleteInspection;
