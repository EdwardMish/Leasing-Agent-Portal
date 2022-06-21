import * as React from 'react';

const marketing = {
    title: 'Marketing',
    faqs: [
        {
            order: 1,
            question: 'How do I create a Facebook business page?',
            answer: (
                <>
                    <p>Social media is no longer &quot;optional&quot; for businesses.</p>
                    <p>
                        Please&nbsp;
                        <a href="/assets/dashcomm/pdfs/DashComm_HowTo_Facebook.pdf">click here</a> to read our &#39;How
                        to&#39; guide.&nbsp;
                    </p>
                </>
            ),
        },
        {
            order: 2,
            question: 'How do I create a LinkedIn company page?',
            answer: (
                <>
                    <p>
                        LinkedIn has become a valuable tool for networking, building relationships, and keeping up with
                        industry news. It&#39;s also a great marketing tool for businesses and individuals alike.
                    </p>
                    <p>
                        Please <a href="/assets/dashcomm/pdfs/DashComm_HowTo_LinkedIn.pdf">click here</a>
                        &nbsp;to read our &#39;How to&#39; guide.
                    </p>
                </>
            ),
        },
        {
            order: 3,
            question: 'How do I claim my business on Google',
            answer: (
                <>
                    <p>
                        Google My Business is a free, easy-to-use tool that allows business owners to take charge of how
                        their business is displayed throughout Google Search and Google Maps.
                    </p>
                    <p>
                        Please <a href="/assets/dashcomm/pdfs/DashComm_HowTo_Google-My-Business.pdf">click here</a> to read
                        our &#39;How to&#39; guide.&nbsp;
                    </p>
                </>
            ),
        },
    ],
};

export default marketing;
