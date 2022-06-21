import React from 'react';

import ValueText from '../../Shared/PageElements/ValueText';
import { MessageCircle } from '../../Icons/MessageCircle';
import { IconWithText } from '../../Shared/PageElements';
import { FlexWrapper } from '../../Shared/FlexWrapper';

import styles from './guarantor-profile-activity.module.css';
import { IconColors } from '../../Icons';

interface Props {
    title: string;
    messageList?: messageProps[];
    isSubmitting?: boolean;
    handleChat: React.MouseEventHandler<HTMLDivElement>;
    custom?: boolean;
    customAsk?: string;
}

interface messageProps {
    user: string;
    text: string;
}

const AssetLiabilityActivityBar: React.FC<Props> = ({ title, isSubmitting, handleChat, custom = false, customAsk }) => {
    return (
        <div className={styles.ActivityWrapper}>
            <FlexWrapper justify='between' align="center">
                {custom ? <div className={styles.TitleWrapper}>
                    <ValueText valueText={title} />
                    <p className={styles.ListSubHeader}>{customAsk}</p>
                </div> : <ValueText valueText={title} />}
                
                <div onClick={handleChat} className={styles.DesktopIcon}>
                    <IconWithText text="Send Message" Icon={MessageCircle} iconAspect={'1.8rem'} />
                </div>
                <div onClick={handleChat} className={styles.MobileIcon}>
                    <MessageCircle color={IconColors.BrandBlue}/>
                </div>
                </FlexWrapper>
        </div>
    );
};

export default AssetLiabilityActivityBar;
