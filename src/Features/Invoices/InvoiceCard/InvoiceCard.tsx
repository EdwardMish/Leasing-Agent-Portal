import * as React from 'react';
import styles from './invoice-card.module.css';
import buttonStyles from '../../../Shared/Styles/button.module.css';
import { InvoicesTypes } from 'API/Invoices';

interface InvoiceCardProps {
    invoice: InvoicesTypes.InvoiceAccount;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
    const { tenantName, propertyName, link } = invoice;

    return (
        <div className={styles.invoiceCard}>
            <div className={styles.invoiceCardHeader}>
                <p className={styles.invoiceCardTenant}>{tenantName}</p>
                <p className={styles.invoiceCardProperty}>@{propertyName}</p>
            </div>
            <div className={styles.invoiceCardBody}>
                <a className={`${buttonStyles.Button}`} style={{ padding: '0.75rem' }} href={link} target="_blank">
                    <span>See Invoice(s)</span>
                </a>
            </div>
        </div>
    );
};

