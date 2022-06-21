import GET from 'API/utils/GET';
import { PrioritySalesItem } from 'Types/Sales/PrioritySalesItem';

const getPrioritySalesItems = (): Promise<PrioritySalesItem[]> => GET.wrapper(`${API_ROOT}/sales/missing`);

export default getPrioritySalesItems;
