import * as React from 'react';

const dashcommSupport = {
    title: 'DashComm Support',
    faqs: [
        {
            order: 1,
            question: 'What is DashComm?',
            answer: (
                <>
                    <p>Please see complete DashComm Welcome Guide here:</p>
                    <a href="/assets/dashcomm/pdfs/dashcomm-welcome-guide-2022.pdf">DashComm Welcome Guide - 2022.pdf</a>
                </>
            ),
        },
        {
            order: 2,
            question: 'DashComm Roles Explained',
            answer: (
                <>
                    <p>
                        DashComm enables access to certain functions based upon your role in the system. See definitions
                        here:
                    </p>
                    <a href="/assets/dashcomm/pdfs/dashcomm-roles.pdf">Handout-DashComm-Roles.pdf</a>
                </>
            ),
        },
        {
            order: 3,
            question: 'How to Submit a Request?',
            answer: (
                <>
                    <p>
                        Please take a look at the DashComm guide on how to submit a request and if you need further
                        assistance, create a <a href="/requests/create">Request</a>.
                    </p>
                    <a href="/assets/dashcomm/pdfs/how-to-submit-a-request.pdf">How-to-Submit-a-Request.pdf</a>
                </>
            ),
        },
        {
            order: 4,
            question: 'How to Submit Sales?',
            answer: (
                <>
                    <p>Directions to Submit Sales:</p>
                    <ul>
                        <li>
                            Click on <a href="/sales">Sales</a>
                        </li>
                        <li>
                            Choose the month showing with a status of &ldquo;Missing&rdquo; and click that plus arrow to
                            enter the missing amounts
                        </li>
                        <li>Enter the sales figure for that month and click NEXT</li>
                        <li>Confirm the amount is correct</li>
                    </ul>
                    <p>
                        Your sales figure is now submitted with a status of &ldquo;Pending&rdquo;, awaiting approval by the
                        Sales Team
                    </p>
                    <p>That&rsquo;s it &ndash; you&rsquo;re done!</p>
                    <a href="/assets/dashcomm/pdfs/how-to-submit-your-sales.pdf">How-to-Submit-Your-Sales.pdf</a>
                </>
            ),
        },
        {
            order: 5,
            question: 'Sales, Invoices or other features not visible?',
            answer: (
                <>
                    <p>
                        If you do not see a feature you believe you should have access to, please email&nbsp;
                        <a href="mailto:DashComm@phillipsedison.com?subject=Account%20Upgrade%20Request">
                            DashComm@phillipsedison.com
                        </a>
                        &nbsp;to request an account upgrade. If you are not the lease guarantor, please copy the guarantor on
                        your account request for approval.
                    </p>
                </>
            ),
        },
        {
            order: 6,
            question: 'How to reset your Password?',
            answer: (
                <>
                    <p>
                        To change your password, visit the login page at www.dashcomm.com and click the &quot;forgot
                        password&quot; button to initiate a password reset email.
                    </p>
                </>
            ),
        },
    ],
};

export default dashcommSupport;
