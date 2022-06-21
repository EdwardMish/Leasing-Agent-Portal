import * as React from 'react';
import { Meta } from '@storybook/react';
import { withFormik } from 'storybook-formik';
import { ComponentStory } from '@storybook/react';
import { withRootAttribute } from 'storybook-addon-root-attribute';

import AddGuarantor from '../Pages/AddGuarantor';
import LeasingHome from '../Pages/LeasingHome';
import NewLead from '../Pages/NewLeadPage';
import LeadDetail from '../Pages/LeadDetail';
import GuarantorSummary from '../Pages/GuarantorSummary';
import GuarantorProfileActivity from '../Pages/GuarantorProfileActivity';
import CustomTask from '../Pages/CreateCustomTask';
import DeleteModal from '../Pages/DeleteModal';

const meta: Meta = {
    decorators: [withFormik, withRootAttribute],
    title: 'Prospective Tenant/ leasing agent',
};

export default meta;

export const leasingHome: ComponentStory<typeof LeasingHome> = (args) => <LeasingHome {...args} />;

export const newLead: ComponentStory<typeof NewLead> = (args) => <NewLead {...args} />;

const Template: ComponentStory<typeof AddGuarantor> = (args) => <AddGuarantor {...args} />;

export const addGuarantorPage = Template.bind({});
addGuarantorPage.args = {
    aspect: '3rem',
    color: '#0071ce',
    placeholder: 'dooope',
};
addGuarantorPage.parameters = {
    formik: {},
};

export const leadDetail: ComponentStory<typeof LeadDetail> = (args) => <LeadDetail {...args} />;

export const guarantorProfileActivity: ComponentStory<typeof GuarantorProfileActivity> = (args) => (
    <GuarantorProfileActivity {...args} />
);

export const customTask: ComponentStory<typeof CustomTask> = (args) => <CustomTask {...args} />;

export const guarantorSummary: ComponentStory<typeof GuarantorSummary> = (args) => <GuarantorSummary {...args} />;

export const deleteModal: ComponentStory<typeof DeleteModal> = (args) => <DeleteModal {...args} />;

