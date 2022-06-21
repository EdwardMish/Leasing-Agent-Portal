import { InvoicesTypes } from 'API/Invoices';
import InvoicesAPI from 'API/Invoices/InvoicesAPI';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoadingContent } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { InvoiceList } from '../InvoiceList';

export const Page: React.FC<{}> = () => {
    const [invoiceAccounts, SetInvoiceAccounts] = React.useState<InvoicesTypes.InvoiceAccount[]>([]);
    const [invoicesLoaded, SetInvoicesLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        InvoicesAPI.getAllInvoiceAccounts()
            .then((data) => {
                SetInvoiceAccounts(data);
                SetInvoicesLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Switch>
            <Route path="/invoices">
                <PageWrapper pageTitle="Invoices">
                    <h1>Invoices</h1>
                    {invoicesLoaded ? <InvoiceList invoices={invoiceAccounts} /> : <LoadingContent />}
                </PageWrapper>
            </Route>
        </Switch>
    );
};

