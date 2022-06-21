import * as React from 'react';

import { Add, Upload, Question } from '../../Icons';
import { IconWithText } from '../../Shared/PageElements';
import AssetLiabilitiesOtherOverview from './AssetLiabilitiesOtherOverview';
import { questionList, documentList } from '../dummyData/dummyData';

import styles from '../Pages/new-tenant-overview-page.module.css';

export const Required = () => {
    const question1 = 'Are you employed elsewhere?'
    const question2 = 'Do you have any money sitting in venmo or paypal type accounts?'

    const shortenQuestion = (string) => {
        if (string.length < 30) return string;
        return string.split('').map((letter, index) => {
            if (index < 30) return letter
        }).join('') + '...?';
    }
    return (
        <div className={styles.RequiredPageWrapper}>
            <div className={styles.IconSpacing}>
                <IconWithText text="Add Assets" Icon={Add} iconAspect={'2rem'} iconOnLeft />
            </div>
            <div className={styles.IconSpacing}>
                <IconWithText text="Add Liabilities" Icon={Add} iconAspect={'2rem'} iconOnLeft />
            </div>
            <div className={styles.IconSpacing}>
                <IconWithText text="Last Years Tax Return" Icon={Upload} iconAspect={'2rem'} iconOnLeft />
            </div>
            <div className={styles.IconSpacing}>
                <IconWithText text={shortenQuestion(question1)} Icon={Question} iconAspect={'2rem'} iconOnLeft />
            </div>
            <div className={styles.IconSpacing}>
                <IconWithText text={shortenQuestion(question2)} Icon={Question} iconAspect={'2rem'} iconOnLeft />
            </div>
        </div>
    );
};

export const Completed = () => {
    const assetSummaryLinkText = 'View Assets';
    const liabilitySummaryLinkText = 'View Liabilities';
    return (
        <div className={styles.NewsList}>
            <AssetLiabilitiesOtherOverview summary buttonText={assetSummaryLinkText} headerText="Assets" />
            <AssetLiabilitiesOtherOverview summary buttonText={liabilitySummaryLinkText} headerText="Liabilities" />
            <AssetLiabilitiesOtherOverview summary buttonText={'View Questions'} headerText="Question" subHeader={true} subHeaderText={questionList[0].question} />
            <AssetLiabilitiesOtherOverview summary buttonText={'View Documents'} headerText="Document" subHeader={true} subHeaderText={documentList[0].title} />
        </div>
    );
};
