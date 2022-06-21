import { LeasingLead, PersonalLeaseApplication } from 'API/Leasing/Types';
import { IdentificationTypeDisplayName } from 'API/Leasing/Types/IdentificationTypes';
import * as React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { SecondaryTitle, Title } from 'Shared/PageElements';
import KeyText from 'Shared/PageElements/KeyText';
import ValueText from 'Shared/PageElements/ValueText';
import { formatCurrency, formatDate, formatPhone, isImageType } from 'utils';
import styles from './profile-snapshot.module.css';
import { AuthenticatedLink } from 'Shared/Documents/AuthenticatedLink';
import PhotoLoader from './PhotoLoader';
import Thumbnail from 'Shared/Forms/Input/UploadFile/Thumbnail';

interface ProfileProps {
    leadId: number;
    leasingLead: LeasingLead;
    guarantorName: string;
    userProfile: PersonalLeaseApplication;
    summary?: boolean;
}

const ProfileSnapshotSummary: React.FC<ProfileProps> = ({
    leadId,
    leasingLead,
    guarantorName,
    userProfile,
    summary = false,
}) => {
    const {
        identificationDocument: { documents },
    } = userProfile;

    const userDetails = [
        { label: 'Credit Score', number: userProfile.creditScore },
        { label: 'Total Assets', number: formatCurrency(userProfile.totalAssets, 0.01, false) },
        { label: 'Total Liabilities', number: formatCurrency(userProfile.totalLiabilities, 0.01, false) },
        { label: 'Net Worth', number: formatCurrency(userProfile.totalAssets - userProfile.totalLiabilities, 0.01, false) },
        { label: 'Phone Number', number: formatPhone(userProfile.phone) },
        { label: 'Date Of Birth', number: userProfile?.dateOfBirth ? formatDate(userProfile.dateOfBirth) : '' },
        { label: 'ID Type', number: IdentificationTypeDisplayName[userProfile.identificationDocument.type] },
        { label: 'ID Number', number: userProfile.identificationDocument.number },
        {
            label: 'Expiration',
            number: userProfile?.identificationDocument?.expiration
                ? formatDate(userProfile.identificationDocument.expiration)
                : '',
        },
        { label: 'Address One', number: userProfile.address.street },
        { label: 'Address Two', number: userProfile.address.street2 },
        { label: 'City', number: userProfile.address.city },
        { label: 'State', number: userProfile.address.state },
        { label: 'Zip Code', number: userProfile.address.zipcode },
    ];

    const { url } = useRouteMatch();
    const history = useHistory();

    const summaryUrl = `${url.substring(0, url.indexOf('/activity'))}/summary`;

    const title = summary ? 'Profile Summary' : 'Profile Activity';

    return (
        <div>
            <FlexWrapper justify="between" align="start" wrap>
                <div>
                    <div>
                        {!!userProfile.completed ? (
                            <div className={styles.CompletedBadge}>Completed Application</div>
                        ) : (
                            <Title title={title} />
                        )}
                    </div>
                    <div>
                        <KeyText keyText={`Lead #${leadId}`} colon={false} />
                        <Title title={guarantorName} level={'h3'} noMarginBottom />
                        <SecondaryTitle title={`${leasingLead.name} @ ${leasingLead.propertyName}`} noBorderBottom />
                    </div>
                </div>
                <div className={styles.IconButtonWrapper}>
                    <FlexWrapper justify="around" align="end" style={{ gap: '1rem' }}>
                        {!summary && (
                            <div className={styles.ButtonPositioning}>
                                <Button
                                    text={'Show Summary'}
                                    callback={() => {
                                        history.push(summaryUrl);
                                    }}
                                    fullWidth
                                />
                            </div>
                        )}
                    </FlexWrapper>
                </div>
            </FlexWrapper>
            <div className={styles.SummaryWrapper}>
                <FlexWrapper justify="between" align="start" wrap>
                    {userDetails.slice(0, 4).map((detail) => (
                        <div className={styles.SummaryItem} key={`${detail.label}`}>
                            <KeyText keyText={detail.label} />
                            <ValueText valueText={detail.number?.toString() || 'none'} />
                        </div>
                    ))}
                </FlexWrapper>
                {summary && (
                    <div className={styles.ProfileWrapper}>
                        <FlexWrapper justify="between" align="start" wrap>
                            <section className={styles.SummaryGroup}>
                                {userDetails.slice(4, 6).map((detail) => (
                                    <div className={styles.SummaryItem} key={`${detail.label}`}>
                                        <KeyText keyText={detail.label} />
                                        <ValueText valueText={detail.number?.toString() || 'none'} small />
                                    </div>
                                ))}
                            </section>
                            <section className={styles.SummaryGroup}>
                                {userDetails.slice(6, 9).map((detail) => (
                                    <div className={styles.SummaryItem} key={`${detail.label}`}>
                                        <KeyText keyText={detail.label} />
                                        <ValueText valueText={detail.number?.toString() || 'none'} small />
                                    </div>
                                ))}
                            </section>
                            <section className={styles.SummaryGroup}>
                                {userDetails.slice(9, 12).map((detail) => (
                                    <div className={styles.SummaryItem} key={`${detail.label}`}>
                                        <KeyText keyText={detail.label} />
                                        <ValueText valueText={detail.number?.toString() || 'none'} small />
                                    </div>
                                ))}
                            </section>
                            <section className={styles.SummaryGroup}>
                                {userDetails.slice(12, 14).map((detail) => (
                                    <div className={styles.SummaryItem} key={`${detail.label}`}>
                                        <KeyText keyText={detail.label} />
                                        <ValueText valueText={detail.number?.toString() || 'none'} small />
                                    </div>
                                ))}
                            </section>
                        </FlexWrapper>
                        <FlexWrapper justify="start" align="start" wrap gap="3rem">
                            {documents.map((document, index) => (
                                <div className={styles.SummaryItem} key={`${document.name}`} style={{ marginTop: '2rem' }}>
                                    <KeyText keyText={`ID Image ${index + 1}`} />
                                    <AuthenticatedLink filename={document.name} url={document.url}>
                                        {isImageType(document.name) ? (
                                            <PhotoLoader photoUrl={document.url} />
                                        ) : (
                                            <Thumbnail
                                                id={`thumbnail-attachment-id-${index + 1}`}
                                                alt={document.name}
                                                name={decodeURI(document.name)}
                                                src={document.url}
                                                isImage={false}
                                                style={{
                                                    width: '8rem',
                                                    height: 'auto',
                                                }}
                                            />
                                        )}
                                    </AuthenticatedLink>
                                </div>
                            ))}
                        </FlexWrapper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileSnapshotSummary;

