import * as React from 'react';
import { ExpandableSection } from 'Shared/ExpandableSection';
import faqSections from '../../Data/FAQSets';
import styles = require('./faqs.module.css');

function FAQList(): JSX.Element {
    return (
        <>
            {faqSections.map(({ title, faqs, index }) => (
                <div key={`faq-section-${index}`} className={styles.FAQSection}>
                    <div className={styles.FAQSectionName}>{title}</div>
                    {faqs.map(({ question, answer, order }) => (
                        <ExpandableSection
                            key={`faq-${index}-${order}`}
                            title={<div className={styles.FAQQuestion}>{question}</div>}
                        >
                            <div className={styles.FAQAnswer}>{answer}</div>
                        </ExpandableSection>
                    ))}
                </div>
            ))}
        </>
    );
}

export default FAQList;
