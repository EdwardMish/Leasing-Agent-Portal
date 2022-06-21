import * as React from 'react';

import { Contacts } from '../../State';
import { hasValidRecord, formatPhone } from '../../utils';

const styles = require('./contact-card.module.css');

interface ContactCardProps {
    contact: Contacts.Types.Contact;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
    const {
        name,
        email,
        businessPhone,
        mobilePhone,
    } = contact;

    const formattedBusiness = formatPhone(businessPhone);
    const formattedMobile = formatPhone(mobilePhone);

    return (
        <div className={styles.ContactCard}>
            <p className={styles.ContactCardName}>{name}</p>
            {/* TODO: Put in user role */}
            {/* hasValidRecord(title) && <p className={styles.ContactCardTitle}>{title}</p> */}
            {hasValidRecord(email) && <p className={styles.ContactCardEmail}><a href={`mailto:${email}`}>{email}</a></p>}
            {formattedBusiness && <p><a href={`tel:${formattedBusiness}`}>{`p: ${formattedBusiness}`}</a></p>}
            {formattedMobile && <p><a href={`tel:${formattedMobile}`}>{`p: ${formattedMobile}`}</a></p>}
        </div>
    );
};
