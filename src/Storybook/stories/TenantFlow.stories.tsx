import { ComponentStory, Meta } from '@storybook/react';
import * as React from 'react';
import { withFormik } from 'storybook-formik';

import Address from '../Pages/Address';
import Assets from '../Pages/AssetsPage';
import ConfirmationPage from '../Pages/ConfirmationPage';
import Identification from '../Pages/Identification';
import Liabilities from '../Pages/LiabilitiesPage';
import AssetUploadLIst from '../Pages/UploadList';
import DocumentUpload from '../Pages/DocumentUpload';
import QuestionAnswerUpload from '../Pages/QuestionAnswerUpload';
import WelcomePage from '../Pages/WelcomePage';
import PersonalData from '../Pages/PersonalData';
import NewTenantOverviewPage from '../Pages/NewTenantOverviewPage';
import GuarantorSummary from '../Pages/GuarantorSummary';
import GuarantorProfileActivity from '../Pages/GuarantorProfileActivity';
import CreateCustomTask from '../Pages/CreateCustomTask';

const meta: Meta = {
    decorators: [withFormik],
    title: 'Prospective Tenant/ Tenant Flow',
};

export default meta;

export const welcomePage: ComponentStory<typeof WelcomePage> = (args) => <WelcomePage {...args} />;

export const personalData: ComponentStory<typeof PersonalData> = (args) => <PersonalData {...args} />;

export const identificationPage: ComponentStory<typeof Identification> = (args) => <Identification {...args} />;

export const addressPage: ComponentStory<typeof Address> = (args) => <Address {...args} />;

export const confirmationPage: ComponentStory<typeof ConfirmationPage> = (args) => <ConfirmationPage {...args} />;

export const newTenantOverviewPage: ComponentStory<typeof NewTenantOverviewPage> = (args) => (
    <NewTenantOverviewPage {...args} />
);

const UploadListTemplate: ComponentStory<typeof AssetUploadLIst> = (args) => <AssetUploadLIst {...args} />;
export const assetUploadList = UploadListTemplate.bind({});
assetUploadList.args = {
    title: 'Assets',
    buttonTitle: 'Add Asset',
    value: '$123,000',
    submit: true,
};
export const liabilityUploadList = UploadListTemplate.bind({});
liabilityUploadList.args = {
    title: 'Liabilities',
    buttonTitle: 'Add Liability',
    value: '$223,000',
    submit: true,
};
export const documentUploadList = UploadListTemplate.bind({});
documentUploadList.args = {
    title: 'Documents',
    buttonTitle: 'Add Document',
    value: '2',
};

export const questionUploadList = UploadListTemplate.bind({});
questionUploadList.args = {
    title: 'Questions',
    buttonTitle: 'Add Question',
    value: '3',
};

export const assets: ComponentStory<typeof Assets> = (args) => <Assets {...args} />;

export const liabilities: ComponentStory<typeof Liabilities> = (args) => <Liabilities {...args} />;

const documentUpload: ComponentStory<typeof DocumentUpload> = (args) => <DocumentUpload {...args} />;
export const requestedDocumentUpload = documentUpload.bind({});
requestedDocumentUpload.args = {
    requested: true,
    document: '2021 tax returns',
};

export const generalDocumentUpload = documentUpload.bind({});

export const questionUpload: ComponentStory<typeof QuestionAnswerUpload> = (args) => <QuestionAnswerUpload {...args} />;

export const guarantorSummary: ComponentStory<typeof GuarantorSummary> = (args) => <GuarantorSummary {...args} />;

export const guarantorProfileActivity: ComponentStory<typeof GuarantorProfileActivity> = (args) => (
    <GuarantorProfileActivity {...args} />
);

export const CustomTask: ComponentStory<typeof CreateCustomTask> = (args) => <CreateCustomTask />;

