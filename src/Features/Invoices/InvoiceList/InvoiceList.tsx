import { InvoicesTypes } from 'API/Invoices';
import * as React from 'react';
import { InvoiceCard } from '../InvoiceCard';

const styles = require('./invoice-list.module.css');

interface InvoiceListProps {
    invoices: InvoicesTypes.InvoiceAccount[];
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ invoices }) => {
    const leaseInvoices = invoices.filter((value) => value.invoiceType === InvoicesTypes.InvoiceType.lease);
    const utilitiesInvoices = invoices.filter((value) => value.invoiceType === InvoicesTypes.InvoiceType.utilities);

    return (
        <>
            {(!invoices || !invoices.length) && <h2>No invoices available at this time.</h2>}

            {!!leaseInvoices.length && (
                <div>
                    <h2>Leases</h2>
                    <div className={styles.invoices}>
                        <h2>Pay and manage your lease invoices with VersaPay</h2>
                        <p>
                            We have partnered with VersaPay to allow the safe and easy management of your location's lease
                            invoices.
                        </p>
                        <p>Click a location below to visit VersaPay and get started.</p>
                    </div>
                    <div className={styles.invoiceCards}>
                        {leaseInvoices.map((invoice, index) => (
                            <InvoiceCard key={index} invoice={invoice} />
                        ))}
                    </div>
                </div>
            )}

            {!!utilitiesInvoices.length && (
                <div>
                    <h2>Utilities</h2>
                    <div className={styles.invoices}>
                        <h2>Pay and manage your utility invoices with ConService</h2>
                        <p>
                            We have partnered with ConService to allow the safe and easy management of your location's
                            utility invoices.
                        </p>
                        <p>Click a location below to visit ConService and get started.</p>
                    </div>
                    <div className={styles.invoiceCards}>
                        {utilitiesInvoices.map((invoice, index) => (
                            <InvoiceCard key={index} invoice={invoice} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
