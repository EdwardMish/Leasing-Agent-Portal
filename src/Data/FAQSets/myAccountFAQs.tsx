import * as React from 'react';

const myAccount = {
    title: 'My Account',
    faqs: [
        {
            order: 1,
            question: 'DashComm - VersaPay Video',
            answer: (
                <>
                    <p>Please click on the video file to view a brief introduction to DashComm and VersaPay</p>
                    <a href="/assets/dashcomm/pdfs/Versa-Pay-and-DashComm-Video.mp4">Versa-Pay-and-DashComm-Video.mp4</a>
                </>
            ),
        },
        {
            order: 2,
            question: 'What is VersaPay?',
            answer: (
                <>
                    <p>
                        This supplemental third-party service is designed with your convenience, control and protection in
                        mind!
                    </p>
                    <p>
                        DashComm redirects you to this portal which allows you the convenience of an emailed notification
                        every time a charge is posted to your account. Invoices are emailed monthly.
                    </p>
                    <a href="/assets/dashcomm/pdfs/Handout-VersaPay-Payments-Guide-2021.pdf">
                        Handout-VersaPay-Payments-Guide-2021.pdf
                    </a>
                </>
            ),
        },
        {
            order: 3,
            question: 'What does the 3 digit abbreviations mean on my invoice?',
            answer: (
                <>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Income Category 3-Digit Abbreviations</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>CAF</td>
                                <td>Fixed CAM</td>
                                <td>LCS</td>
                                <td>Late Charges - Sales</td>
                                <td>PTO</td>
                                <td>Other Prop Tax Charge</td>
                            </tr>
                            <tr>
                                <td>CAM</td>
                                <td>CAM Charge</td>
                                <td>MEB</td>
                                <td>Metered Electric Billing</td>
                                <td>PTX</td>
                                <td>Property Tax Charge</td>
                            </tr>
                            <tr>
                                <td>CEB</td>
                                <td>Conservice Electric Bill</td>
                                <td>MGB</td>
                                <td>Metered Gas Billing</td>
                                <td>RCK</td>
                                <td>Returned Check Fee</td>
                            </tr>
                            <tr>
                                <td>CGB</td>
                                <td>Conservice Gas Billing</td>
                                <td>MGF</td>
                                <td>Management Fees</td>
                                <td>RNT</td>
                                <td>Rent Charge</td>
                            </tr>
                            <tr>
                                <td>CMN</td>
                                <td>CAM - Non-escrowed</td>
                                <td>MSC</td>
                                <td>Miscellaneous</td>
                                <td>SEC</td>
                                <td>Security</td>
                            </tr>
                            <tr>
                                <td>CMP</td>
                                <td>Prior Year Cam</td>
                                <td>MUB</td>
                                <td>Meter Utility Billing - Water</td>
                                <td>SGN</td>
                                <td>Signage</td>
                            </tr>
                            <tr>
                                <td>CWB</td>
                                <td>Conservice Water Billing</td>
                                <td>MWA</td>
                                <td>Metered Water</td>
                                <td>TAX</td>
                                <td>Sales Tax Liability</td>
                            </tr>
                            <tr>
                                <td>ELE</td>
                                <td>Electric</td>
                                <td>OPR</td>
                                <td>Open Credits</td>
                                <td>TBB</td>
                                <td>Tenant Bill Back</td>
                            </tr>
                            <tr>
                                <td>FUE</td>
                                <td>Fuel Station Rent</td>
                                <td>&nbsp;ORT</td>
                                <td>Other Rent</td>
                                <td>TMP</td>
                                <td>Temporary Rent</td>
                            </tr>
                            <tr>
                                <td>GLR</td>
                                <td>Ground Lease Rent</td>
                                <td>OVE</td>
                                <td>Overage Rent</td>
                                <td>TRA</td>
                                <td>Trash Service</td>
                            </tr>
                            <tr>
                                <td>GPR</td>
                                <td>Gross Perc Rent in Lieu</td>
                                <td>POC</td>
                                <td>Previous Owner Cam Rec</td>
                                <td>TRM</td>
                                <td>Termination Agreement</td>
                            </tr>
                            <tr>
                                <td>GRS</td>
                                <td>Gross Rent</td>
                                <td>POI</td>
                                <td>Prior Owner Insurance</td>
                                <td>TRP</td>
                                <td>Prior Year Trash</td>
                            </tr>
                            <tr>
                                <td>HLD</td>
                                <td>Hold Over Rent</td>
                                <td>POT</td>
                                <td>Prior Owner Trash</td>
                                <td>TXN</td>
                                <td>Real Estate Tax - Non-es</td>
                            </tr>
                            <tr>
                                <td>INF</td>
                                <td>Fixed Insurance</td>
                                <td>POU</td>
                                <td>Prior Owner CAM-Uncapped</td>
                                <td>TXO</td>
                                <td>Prior Yr Other RE Tax</td>
                            </tr>
                            <tr>
                                <td>INN</td>
                                <td>Insurance - Non-escrowed</td>
                                <td>POW</td>
                                <td>Prior Owner Water</td>
                                <td>TXP</td>
                                <td>Prior Yr Real Estate Tax</td>
                            </tr>
                            <tr>
                                <td>INP</td>
                                <td>Prior Year Insurance</td>
                                <td>PPD</td>
                                <td>Prepaid Charges</td>
                                <td>&nbsp;UTL</td>
                                <td>CAM-Uncapped</td>
                            </tr>
                            <tr>
                                <td>INS</td>
                                <td>Insurance Charge</td>
                                <td>PRE</td>
                                <td>Previous Owner Real Estate Tax</td>
                                <td>UTN</td>
                                <td>CAM-Uncapped-Non-escrow</td>
                            </tr>
                            <tr>
                                <td>LC</td>
                                <td>Late Charge</td>
                                <td>PRL</td>
                                <td>Percent Rent Lieu Minimum Rent</td>
                                <td>UTP</td>
                                <td>Prior Year CAM-Uncapped</td>
                            </tr>
                            <tr>
                                <td>LCO</td>
                                <td>Late Charge Other</td>
                                <td>PTF</td>
                                <td>Fixed Property Tax</td>
                                <td>WAT</td>
                                <td>Water</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ),
        },
        {
            order: 4,
            question: 'Why did I receive a late fee?',
            answer: (
                <>
                    <p>
                        We bill according to your lease.&nbsp; Your lease specifies if there is a grace period, and, if so,
                        how long.&nbsp; A payment was not received in full within the number of grace days in your lease,
                        resulting in the late charge being posted.
                    </p>
                </>
            ),
        },
        {
            order: 5,
            question: 'Why did my rent go up?',
            answer: (
                <>
                    <p>
                        Your rent is calculated and billed according to the schedule in your lease.&nbsp; Please review your
                        lease to find the applicable rent schedule.
                    </p>
                </>
            ),
        },
    ],
};

export default myAccount;
