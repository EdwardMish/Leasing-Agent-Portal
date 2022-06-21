import React from 'react';
import { Inspection } from '../../../../State/Inspections/Types';
import { format } from 'date-fns';
import styles from './print.module.css';
interface PrintCover {
    inspection: Inspection | null;
}

export default function CoverPage({ inspection }: PrintCover): React.ReactElement {
    return inspection ? (
        <div className={styles.PrintTitlePage}>
            <h1 className={styles.PrintTitle}>{inspection?.propertyName}</h1>
            <h2 className={styles.SectionTitle}>{inspection?.creator}</h2>
            <h2 className={styles.SectionTitle}>{format(new Date(inspection.createdDate), 'LL/dd/yy')} </h2>
        </div>
    ) : (
        <></>
    );
}
