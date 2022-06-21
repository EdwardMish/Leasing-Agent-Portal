import * as React from 'react';
import { PageWrapper } from 'Shared/PageWrapper/PageWrapper';
import FAQList from '../FAQList';

function Page(): JSX.Element {
    return (
        <PageWrapper pageTitle="FAQs (Frequently Asked Questions)">
            <h1>FAQs (Frequently Asked Questions)</h1>
            <FAQList />
        </PageWrapper>
    );
}

export default Page;
