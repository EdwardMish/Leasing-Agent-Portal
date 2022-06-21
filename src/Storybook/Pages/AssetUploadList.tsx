// import React from 'react';
// import { Add } from '../../Icons/Add';
// import { FlexWrapper } from '../../Shared/FlexWrapper';
// import { IconWithText } from '../../Shared/PageElements';
// import Divider from '../../Shared/PageElements/Divider';
// import KeyText from '../../Shared/PageElements/KeyText';
// import Title from '../../Shared/PageElements/Title';
// import ValueText from '../../Shared/PageElements/ValueText';
// import AssetsOverview from '../molecules/AssetsOverview';
// import DocumentDetail from '../molecules/DocumentDetail';
// import LiabilitiesOverview from '../molecules/LiabilitiesOverview';
// import { BackButton } from '../molecules/NavigationButtons';
// import QuestionDetail from '../molecules/QuestionDetail';
// import styles from './assets-liabilities.module.css';

// interface AssetListProps {
//     title: string;
//     buttonTitle: string;
//     value: string;
// }

// const AssetUploadList: React.FC<AssetListProps> = ({ title, buttonTitle, value }) => {
//     return (
//         <div className={styles.PageWrapper}>
//             <div className={styles.AssetsHeader}>
//                 <FlexWrapper justify="between" align="start">
//                     <Title title={`${title} Overview`} />
//                     <div className={styles.UploadTotalWrapper}>
//                         <KeyText keyText={`Total ${title}`} />
//                         <ValueText valueText={value} />
//                     </div>
//                 </FlexWrapper>
//             </div>

//             <Divider />
//             {title == 'Assets' ? (
//                 <AssetsOverview edit />
//             ) : title == 'Documents' ? (
//                 <DocumentDetail />
//             ) : title == 'Questions' ? (
//                 <QuestionDetail />
//             ) : (
//                 <LiabilitiesOverview edit />
//             )}
//             {title == 'Questions' ? '' : <IconWithText text={buttonTitle} Icon={Add} iconAspect={'2rem'} iconOnLeft />}

//             <BackButton title="back" />
//         </div>
//     );
// };

// export default AssetUploadList;
