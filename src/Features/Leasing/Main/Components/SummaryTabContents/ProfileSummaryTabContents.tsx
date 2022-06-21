import { API as LeasingAPI } from 'API/Leasing';
import { Asset, Liability, Question, Document } from 'API/Leasing/Types';
import AssetsCompleteDetail from 'Features/Leasing/Main/Components/SummaryTabContents/AssetsCompleteDetail';
import LiabilitiesCompleteDetail from 'Features/Leasing/Main/Components/SummaryTabContents/LiabilitiesCompleteDetail';
import DocumentsCompleteDetail from 'Features/Leasing/Main/Components/SummaryTabContents/DocumentsCompleteDetail';
import QuestionCompleteDetail from 'Features/Leasing/Main/Components/SummaryTabContents/QuestionsCompleteDetail';
import React from 'react';
import { useDispatch } from 'react-redux';
import { globalMessageActionCreators } from 'State';
import { formatCurrency } from 'utils';
import styles from './summaryContent.module.css';

interface Properties {
    assets?: boolean;
    liabilities?: boolean;
    other?: boolean;
    applicationId: number;
}

const ProfileSummaryTabContents: React.FC<Properties> = ({ assets, liabilities, other, applicationId }) => {
    const [assetList, setAssetList] = React.useState<Asset[]>([]);
    const [liabilitiesList, setLiabilitiesList] = React.useState<Liability[]>([]);
    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [documents, setDocuments] = React.useState<Document[]>([]);

    const dispatch = useDispatch();
    React.useEffect(() => {
        LeasingAPI.getAssets(applicationId)
            .then((res) => {
                setAssetList(res);
            })
            .catch((err) => dispatch(globalMessageActionCreators.addErrorMessage('Unable to retrieve assets', err)));

        LeasingAPI.getLiabilities(applicationId)
            .then((res) => {
                setLiabilitiesList(res);
            })
            .catch((err) => dispatch(globalMessageActionCreators.addErrorMessage('Unable to retrieve liabilities', err)));

        LeasingAPI.getQuestions(applicationId)
            .then((res) => {
                setQuestions(res);
            })
            .catch((err) => dispatch(globalMessageActionCreators.addErrorMessage('Unable to retrieve questions', err)));

        LeasingAPI.getDocuments(applicationId)
            .then((res) => {
                setDocuments(res);
            })
            .catch((err) => dispatch(globalMessageActionCreators.addErrorMessage('Unable to retrieve questions', err)));
    }, []);

    return (
        <>
            {assets &&
                assetList &&
                assetList.map((Asset) => (
                    <div className={styles.OverviewBorder} key={Asset.id}>
                        <AssetsCompleteDetail
                            edit={false}
                            nickname={Asset.nickName}
                            type={Asset.type}
                            value={formatCurrency(Asset.amount, 0.01, false)}
                            accountType={Asset.isJoint ? 'Joint Account' : 'Individual Account'}
                            joiner={Asset.jointOwnersName}
                            uploads={Asset.attachments}
                        />
                    </div>
                ))}
            {liabilities &&
                liabilitiesList &&
                liabilitiesList.map((liability) => (
                    <div className={styles.OverviewBorder} key={liability.id}>
                        <LiabilitiesCompleteDetail
                            edit={false}
                            nickname={liability.nickName}
                            type={liability.type}
                            otherName={liability.otherTypeName}
                            value={formatCurrency(liability.amount, 0.01, false)}
                            accountType={liability.isJoint ? 'Joint Account' : 'Individual Account'}
                            joiner={liability.jointOwnersName}
                            uploads={liability.attachments}
                        />
                    </div>
                ))}
            {other &&
                questions?.map((q) => (
                    <div className={styles.OverviewBorder} key={q.id}>
                        <QuestionCompleteDetail question={q.question} answer={q.answer} />
                    </div>
                ))}

            {other &&
                documents?.map((document) => (
                    <div className={styles.OverviewBorder} key={document.id}>
                        <DocumentsCompleteDetail name={document.name || ''} documents={document.documents || ''} />
                    </div>
                ))}
        </>
    );
};

export default ProfileSummaryTabContents;

