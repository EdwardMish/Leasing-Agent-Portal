import * as React from 'react';

const newTenant = {
    title: 'New Neighbor',
    faqs: [
        {
            order: 1,
            question: 'How do I get a mailbox key?',
            answer: (
                <>
                    <p>
                        To obtain a key to your mailbox, you will need to take a copy of your signed lease to the post office
                        and they will provide you a key.
                    </p>
                </>
            ),
        },
        {
            order: 2,
            question: 'How do I receive my Tenant Improvement Allowance?',
            answer: (
                <>
                    <p>
                        The quickest and easiest way to ask a question about Tenant Improvement Allowance (TIA) is to create
                        a DashComm Request with the category TIA.
                    </p>
                    <p>
                        To receive your Tenant Improvement Allowance, there are a list of required documents needed to
                        process the request. Please reference your lease for the specific documents. You can mail your
                        request form to:
                    </p>
                    <p>Phillips Edison &amp; Company</p>
                    <p>Attn: TIA PAYMENT REQUESTS</p>
                    <p>11501 Northlake Drive Cincinnati, OH 45249</p>
                </>
            ),
        },
        {
            order: 3,
            question: 'What is the physical address of the space?',
            answer: (
                <>
                    <p>
                        The post office can provide the most accurate information in regards to the physical address of the
                        space. Phillips Edison can provide to you the physical address based on the information we have BUT
                        the physical address can be verified and confirmed by the post office.
                    </p>
                    <p>
                        Users in the Administrator Role for your business have access to view the physical address Phillips
                        Edison has on file. See page 11 of the DashComm Guidebook.
                    </p>
                    <a href="/assets/dashcomm/pdfs/dashcomm-welcome-guide-2022.pdf">DashComm Welcome Guide - 2022.pdf</a>
                </>
            ),
        },
        {
            order: 4,
            question: 'When will I receive keys?',
            answer: (
                <>
                    <p>
                        Keys will not be provided to you upon turnover of the Demised Premises as it is the Neighbor&apos;s
                        (tenant) responsibility to rekey. Phillips Edison does not need a copy of your key.
                    </p>
                </>
            ),
        },
        {
            order: 5,
            question: 'Where do I submit certificate of insurance, signage, plans and permits?',
            answer: (
                <>
                    <p>
                        Users in the Administrator Role for your business have access to submit compliance items. See page 12
                        of the DashComm Welcome Guide.
                    </p>
                    <a href="/assets/dashcomm/pdfs/dashcomm-welcome-guide-2022.pdf">DashComm Welcome Guide - 2022.pdf</a>
                </>
            ),
        },
        {
            order: 6,
            question: 'How can I get a copy of the Sample Certificate of Insurance?',
            answer: (
                <>
                    <p>Please see PECO Tenant Sample COI here:</p>
                    <a href="/assets/dashcomm/pdfs/peco-tenant-sample-coi-2021.pdf">PECO Tenant Sample COI 2021.pdf</a>
                </>
            ),
        },
        {
            order: 7,
            question: 'How can I manage DashComm Users for my business?',
            answer: (
                <>
                    <p>
                        Users in the Administrator Role for your business have access to manage users. See page 12 of the
                        DashComm Guidebook.
                    </p>
                    <a href="/assets/dashcomm/pdfs/dashcomm-welcome-guide-2022.pdf">DashComm Welcome Guide - 2022.pdf</a>
                </>
            ),
        },
        {
            order: 8,
            question: 'Why do I need insurance?',
            answer: (
                <>
                    <p>General liability and property insurance is required by all of our tenants.</p>
                    <p>
                        Please reference your lease for specific limits and descriptions. If you have a contractor performing
                        work in the Demised Premises, it is required per lease negotiations that the contractor carry
                        insurance.
                    </p>
                </>
            ),
        },
    ],
};

export default newTenant;
