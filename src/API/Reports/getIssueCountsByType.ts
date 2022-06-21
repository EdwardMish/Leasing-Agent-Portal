import GET from 'API/utils/GET';
import { GetIssueCountsByTypeResponse, IssueTypesByCount } from '../../Types';

const getIssueCountsByType = async (): Promise<IssueTypesByCount[]> => {
    const data: GetIssueCountsByTypeResponse = await GET.wrapper(`${API_ROOT}/reports/get-issue-counts-by-type`);
    return data.typeCounts;
};

export default getIssueCountsByType;
