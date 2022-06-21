import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import KeyText from '../../../Shared/PageElements/KeyText';
import ValueText from '../../../Shared/PageElements/ValueText';
import { formatCurrency } from '../../../utils';
import { BASE_LEASE_APPLICATION_ROUTE } from './Pages/Page';
import styles from './sidebar.module.css';

interface SidebarLink {
    label: string;
    value: string;
    link?: string;
}

function Sidebar({ application }) {
    const [sidebarDetails, setSidebarDetails] = useState<SidebarLink[]>([]);

    useEffect(() => {
        let isCancelled = false;
        if (application) {
            if (!isCancelled) {
                const newSidebarDetails: SidebarLink[] = [];
                newSidebarDetails.push({ label: 'Credit Score', value: `${application.creditScore}` } as SidebarLink);
                newSidebarDetails.push({
                    label: 'Assets',
                    value: `${formatCurrency(application.totalAssets, 0.01, false)}`,
                    link: `${BASE_LEASE_APPLICATION_ROUTE}/assets`,
                } as SidebarLink);
                newSidebarDetails.push({
                    label: 'Liabilities',
                    value: `${formatCurrency(application.totalLiabilities, 0.01, false)}`,
                    link: `${BASE_LEASE_APPLICATION_ROUTE}/liabilities`,
                } as SidebarLink);
                newSidebarDetails.push({
                    label: 'Documents',
                    value: `${application.totalDocuments} documents`,
                    link: `${BASE_LEASE_APPLICATION_ROUTE}/documents`,
                } as SidebarLink);
                newSidebarDetails.push({
                    label: 'Questions',
                    value: `${application.totalQuestions} questions`,
                    link: `${BASE_LEASE_APPLICATION_ROUTE}/questions`,
                } as SidebarLink);
                newSidebarDetails.push({
                    label: 'Messages',
                    value: `${application.unreadMessages} messages`,
                    link: 'messages',
                } as SidebarLink);
                setSidebarDetails(newSidebarDetails);
            }
        }
        return () => {
            isCancelled = true;
        };
    }, [application]);

    return (
        <div className={styles.OverviewSidebar}>
            <FlexWrapper justify="between" align="start" wrap>
                {sidebarDetails.map((detail: SidebarLink) => (
                    <div className={styles.SidebarRow} key={`${detail.label}`}>
                        {!!detail.link ? (
                            <Link to={detail.link}>
                                <KeyText keyText={detail.label} />
                                <ValueText valueText={detail.value} />
                            </Link>
                        ) : (
                            <>
                                <KeyText keyText={detail.label} />
                                <ValueText valueText={detail.value} />
                            </>
                        )}
                    </div>
                ))}
            </FlexWrapper>
        </div>
    );
}

export default Sidebar;
