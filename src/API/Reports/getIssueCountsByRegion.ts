import GET from 'API/utils/GET';
import { GetIssueCountsByRegionResponse, IssueCountByRegion } from '../../Types';

const getIssueCountsByRegion = async (): Promise<IssueCountByRegion[]> => {
    const data: GetIssueCountsByRegionResponse = await GET.wrapper(`${API_ROOT}/reports/get-issue-counts-by-region`);
    return data.counts;
};

export default getIssueCountsByRegion;
