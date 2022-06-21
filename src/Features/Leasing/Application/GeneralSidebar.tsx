import { UrlFile } from 'API/Leasing/Types/Asset';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedLink } from 'Shared/Documents/AuthenticatedLink';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { desktopRow, mobileColumn } from 'Shared/FlexWrapper/flexWrapper-module.css';
import KeyText from 'Shared/PageElements/KeyText';
import ValueText from 'Shared/PageElements/ValueText';
import styles from './sidebar.module.css';

export interface SidebarLink {
    label?: string;
    value: string;
    link?: string;
    links?: (File | UrlFile)[];
    style?: Record<string, string>;
}

interface GeneralSidebarProps {
    sidebarDetails: SidebarLink[];
    style?: Record<string, string>;
    fullWidth?: boolean;
}

interface SingleDetailProps {
    detail: SidebarLink;
}

interface SingleLabelValueProps {
    label: string;
    value: string | number;
    style?: Record<string, string>;
}

export const SingleLabelValue = ({ label, value, style }: SingleLabelValueProps): React.ReactElement => (
    <div className={styles.UploadTotalWrapper} style={style}>
        <KeyText keyText={label} />
        <ValueText valueText={value} />
    </div>
);

export const SingleDetail = ({ detail }: SingleDetailProps): React.ReactElement => {
    if (detail.links) {
        return (
            <>
                <KeyText keyText={detail.label} />
                {detail.links.map((singleLink: UrlFile) => (
                    <AuthenticatedLink
                        filename={decodeURI(singleLink.name)}
                        url={singleLink.url}
                        key={singleLink.name}
                        style={{ fontSize: '0.875rem', display: 'block' }}
                    >
                        {singleLink.name}
                    </AuthenticatedLink>
                ))}
            </>
        );
    }

    if (detail.link) {
        return (
            <Link to={detail.link}>
                <KeyText keyText={detail.label} />
                <ValueText valueText={detail.value} small />
            </Link>
        );
    }

    if (detail.label) {
        return (
            <>
                <KeyText keyText={detail.label} />
                <ValueText valueText={detail.value} small />
            </>
        );
    }

    return <ValueText valueText={detail.value} />;
};

const GeneralSidebar = ({ sidebarDetails, style, fullWidth = false }: GeneralSidebarProps): React.ReactElement =>
    !!sidebarDetails && (
        <div className={styles.OverviewSidebar} style={style}>
            <FlexWrapper className={`${desktopRow} ${mobileColumn}`} justify="between" align="start" wrap fullWidth>
                {sidebarDetails.map((detail: SidebarLink) => (
                    <div
                        className={fullWidth ? styles.FullWidth : styles.SidebarRow}
                        key={`${detail.label}`}
                        style={detail.style}
                    >
                        <SingleDetail detail={detail} />
                    </div>
                ))}
            </FlexWrapper>
        </div>
    );

export default GeneralSidebar;
