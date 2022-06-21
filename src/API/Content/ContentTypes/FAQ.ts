import { FAQAttachment } from './FAQAttachment';

export interface FAQ {
    faqQuestion: string;
    faqAnswer: string;
    attachments: FAQAttachment[];
}
