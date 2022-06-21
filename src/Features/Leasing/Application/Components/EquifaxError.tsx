import { Bureau } from 'API/Leasing/Types';
import React from 'react';
import styles from './equifax-error.module.css';

interface Properties {
    bureauInfo: Bureau;
}

function EquifaxError({ bureauInfo }: Properties): JSX.Element {
    return (
        <div className={`${styles.EquifaxError}`}>
            <p className={styles.Description}>
                We are unable to retrieve your credit report from Equifax using the information you have provided. Please
                update any incorrect information above or contact Equifax to resolve any outstanding issues with your credit
                report.
            </p>
            <p className={styles.ContactInformation}>
                The contact information for Equifax is: <br />
                <span>
                    <strong>Phone Number:</strong> {bureauInfo?.phoneNumber} <br />
                </span>
                {bureauInfo && bureauInfo.address && (
                    <span>
                        <strong>Address:</strong> {bureauInfo?.address}
                    </span>
                )}
            </p>
            <p>Once you have resolved any issues with your information or credit report, please try again.</p>
            <p>If you are still experiencing issues, please reach out to your leasing agent.</p>
        </div>
    );
}

export default EquifaxError;
