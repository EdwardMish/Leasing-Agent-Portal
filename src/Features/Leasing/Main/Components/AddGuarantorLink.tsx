import { Add } from 'Icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import IconWithText from 'Shared/PageElements/IconWithText';

import styles from './add-guarantor-link.module.css';

interface Properties {
    leasingLeadId: number;
}

function AddGuarantorLink({ leasingLeadId }: Properties): React.ReactElement {
    return (
        <div className={styles.AddGuarantorLink}>
            <Link to={`/leasing/leads/${leasingLeadId}/add-guarantor`}>
                <IconWithText iconOnLeft={true} text="Add Guarantor" Icon={Add} iconAspect="1.5rem" />
            </Link>
        </div>
    );
}

export default AddGuarantorLink;
