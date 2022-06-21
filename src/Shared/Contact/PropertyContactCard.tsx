import * as React from 'react';

import { formatPhone, hasValidRecord } from '../../utils';

const styles = require('./contact-card.module.css');

interface PropertyContactCardProps {
    contact: {
        name: string;
        email: string;
        businessPhone: string;
        mobilePhone: string;
        contactType: string;
    };
}

export const PropertyContactCard: React.FC<PropertyContactCardProps> = ({ contact }) => {
    const {
        name,
        email,
        businessPhone,
        mobilePhone,
        contactType,
    } = contact;

    const formattedBusiness = formatPhone(businessPhone);
    const formattedMobile = formatPhone(mobilePhone);

    return (
        <div className={styles.ContactCard}>
            <p className={styles.ContactCardName}>{name}</p>
            {hasValidRecord(contactType) && <p className={styles.ContactCardTitle}>{contactType}</p>}
            {hasValidRecord(email) && <p className={styles.ContactCardEmail}><a href={`mailto:${email}`}>{email}</a></p>}
            {formattedBusiness && <p><a href={`tel:${formattedBusiness}`}>{`p: ${formattedBusiness}`}</a></p>}
            {formattedMobile && <p><a href={`tel:${formattedMobile}`}>{`p: ${formattedMobile}`}</a></p>}
        </div>
    );
};
