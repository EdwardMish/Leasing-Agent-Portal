import GET from 'API/utils/GET';
import { InvoiceAccount } from '../InvoicesTypes/InvoiceAccount';

const getAllInvoiceAccounts = async (): Promise<InvoiceAccount[]> => GET.wrapper<InvoiceAccount[]>(`${API_ROOT}/invoices`);

export default getAllInvoiceAccounts;
