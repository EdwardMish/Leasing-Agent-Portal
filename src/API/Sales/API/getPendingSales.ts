import GET from 'API/utils/GET';
import { PendingSalesSubmittal } from 'Types/Sales/PendingSalesSubmittal';

const getPendingSales = (): Promise<PendingSalesSubmittal[]> => GET.wrapper(`${API_ROOT}/sales/pending`);

export default getPendingSales;
