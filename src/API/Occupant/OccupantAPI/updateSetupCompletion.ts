import PATCH from 'API/utils/PATCH';

const updateSetupCompletion = (occupantId: number | string): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/occupants/${occupantId}/setup-complete`);

export default updateSetupCompletion;
