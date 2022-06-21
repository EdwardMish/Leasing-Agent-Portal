import DELETE from 'API/utils/DELETE';

const deleteInteraction = (inspectionId: number, interactionId: number): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/inspections/${inspectionId}/interactions/${interactionId}`);

export default deleteInteraction;
