import React from 'react';
import { Meta } from '@storybook/react';
import { ComponentStory } from '@storybook/react';

import CompletedInspectionsPrint from '../styledForPrint/CompletedInspectionsPrint';

const meta: Meta = {
  title: 'PDF styled Pages/ Inspections',
};

export default meta;

const Template: ComponentStory<typeof CompletedInspectionsPrint> = (args) => (
  <CompletedInspectionsPrint {...args} />
);

export const completedInspectionsPDF = Template.bind({});
completedInspectionsPDF.args = {};