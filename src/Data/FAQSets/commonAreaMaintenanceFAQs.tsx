import * as React from 'react';

const commonAreaMaintenance = {
    title: 'Common Area Maintenance (CAM)',
    faqs: [
        {
            order: 1,
            question: 'What is Conservice?',
            answer: (
                <>
                    <p>
                        Conservice is a third party utility company that handles tenant utility billing and utility payments.
                    </p>
                </>
            ),
        },
        {
            order: 2,
            question: 'Are all utilities included in the amount due?',
            answer: (
                <>
                    <p>
                        Some tenants may receive a periodic bill from Conservice, a third-party utility service provider, in
                        addition to the reconciliation herein.
                    </p>
                    <p>
                        Please note that any utilities billed directly to you through Conservice are for utilities specific
                        to your unit, whereas utility amounts billed through this reconciliation are for common areas within
                        the shopping center and are not included in your Conservice payment.
                    </p>
                    <p>
                        Therefore, any amounts owed herein for utilities are not duplicate billings nor are they already
                        covered by your Conservice payments.
                    </p>
                </>
            ),
        },
        {
            order: 3,
            question: 'Are my escrows taken into account?',
            answer: (
                <>
                    <p>
                        The total amount of escrows or estimated payments billed to your account during the reconciliation
                        period can be located on the last page of this reconciliation packet, in the line titled &quot;Total
                        Estimates Billed&quot;.
                    </p>
                    <p>
                        If your internal records are showing a different number paid than what was billed, please inquire
                        with your collections specialist or arrequest@phillipsedison.com so that the application of payments
                        made can be researched.
                    </p>
                </>
            ),
        },
        {
            order: 4,
            question: 'Does the amount due include unpaid escrows?',
            answer: (
                <>
                    <p>
                        The balance due per the table on the previous page assumes that all monthly estimates or escrows
                        previously billed were paid in full. As such, any unpaid escrows per your account statement are due
                        to us immediately in addition to the balance due on the previous page.
                    </p>
                    <p>
                        If a credit is owed to you per the reconciliation and there are short-paid or unpaid escrow charges
                        for the year, the credit will first be applied to those short-paid or unpaid charges.
                    </p>
                </>
            ),
        },
        {
            order: 5,
            question: 'How much do I owe?',
            answer: (
                <>
                    <p>
                        The total balance due is presented in the My Account section of DashComm. If this amount is negative,
                        please contact your collections specialist for information on applying this credit.
                    </p>
                </>
            ),
        },
    ],
};

export default commonAreaMaintenance;
