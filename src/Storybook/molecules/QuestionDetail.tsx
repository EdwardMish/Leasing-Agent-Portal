import * as React from 'react';

import ValueText from '../../Shared/PageElements/ValueText';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import { Pencil } from '../../Icons/Pencil';
import { IconColors } from '../../Icons/IconColors';
import { questionList } from '../dummyData/dummyData';

import styles from '../Pages/guarantor-profile-overview.module.css';
import styles2 from '../Pages/guarantor-profile-activity.module.css';

const QuestionDetail = ({ edit = true }) => {
    return (
        <div>
            {questionList.map((question) => (
                <div className={styles2.OverviewBorder}>
                    <FlexWrapper justify="between" align="start">
                        <div className={styles.QuestionWrapper}>
                        <ValueText valueText={question.question} />
                        </div>
                        {edit ? <Pencil aspect={'1.3rem'} color={IconColors.BrandBlue} /> : ''}
                    </FlexWrapper>
                    <div className={styles.flexWrapper}>
                        <div className={`${styles.SubHeaderKeyValue} ${styles.LongText}`}>
                            <ValueText valueText={question.answer} small />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuestionDetail;
