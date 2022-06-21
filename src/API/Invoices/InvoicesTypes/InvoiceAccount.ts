import InvoiceType from './InvoiceType';

export interface InvoiceAccount {
    tenantName: string;
    propertyName: string;
    invoiceType: InvoiceType;
    link: string;
}
