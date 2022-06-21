import * as React from 'react';

import GuarantorProfile from './GuarantorProfile';
import Title from '../../Shared/PageElements/Title';

// import KeyValue from '../../Shared/PageElements/KeyText';
import KeyText from '../../Shared/PageElements/KeyText';
import ValueText from '../../Shared/PageElements/ValueText';
import { Download } from '../../Icons';
import { MockButton } from '../molecules/NavigationButtons';
import { IconWithText } from '../../Shared/PageElements';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import { IconColors } from '../../Icons/IconColors';
import { UserDetails } from '../dummyData/dummyData';

import styles from '../Pages/guarantor-profile-activity.module.css';

interface ProfileProps {
    guarantor: string;
    leadName: string;
    leadBusiness?: string;
    backColor?: string;
    buttonText: string;
    summary?: boolean;
    print?: boolean;
}

const ProfileSnapshot: React.FC<ProfileProps> = ({
    guarantor,
    leadName,
    leadBusiness,
    backColor,
    buttonText,
    summary = false,
    print = false,
}) => {
    return (
        <div>
            <div className={styles.Test}>
                <FlexWrapper justify="between" align="start" wrap>
                    {summary ? (
                        <div>
                            <div>
                                <Title title={`Profile Summary`} noMarginBottom />
                            </div>
                            <div className={styles.SubHeaderKeyValuePositioning}>
                                <KeyText keyText={leadName} colon={false} />
                                <ValueText valueText={guarantor} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <Title title={'Profile Activity'} noMarginBottom />
                            </div>
                            <div className={styles.SubHeaderKeyValuePositioning}>
                                <KeyText keyText={leadName} colon={false} />
                                <ValueText valueText={guarantor} />
                                <ValueText valueText={'10 days since last interaction'} small />
                            </div>
                        </div>
                    )}
                    {print ? (
                        <div className={styles.IconPositioning}>
                            <IconWithText
                                text="Export Summary"
                                Icon={Download}
                                iconAspect={'2rem'}
                                color={IconColors.SucccessGreen}
                            />
                        </div>
                    ) : (
                        <div className={styles.ButtonPositioning}>
                            <MockButton title={buttonText} />
                        </div>
                    )}
                </FlexWrapper>

                <FlexWrapper justify="between" align="start" wrap>
                    {UserDetails.map((detail) => (
                        <div className={styles.CreditProfileScore}>
                            <KeyText keyText={detail.label} />
                            <ValueText valueText={detail.number} />
                        </div>
                    ))}
                </FlexWrapper>

                {summary ? <GuarantorProfile /> : ''}
            </div>
        </div>
    );
};

export default ProfileSnapshot;

