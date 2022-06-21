import GET from 'API/utils/GET';

const getOccupantContactIds = (occupantId: number | string): Promise<number[]> =>
    GET.wrapper(`${API_ROOT}/occupants/${occupantId}/contacts`);

export default getOccupantContactIds;
