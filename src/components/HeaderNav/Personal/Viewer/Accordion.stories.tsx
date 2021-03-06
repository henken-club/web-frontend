import {Meta, Story} from '@storybook/react';
import React from 'react';

import {Accordion, AccordionProps} from './Accordion';

export default {
  title: 'HeaderNav/Personal/Viewer/Accordion',
  component: Accordion,
} as Meta;

export const Primary: Story<AccordionProps> = (args) => <Accordion {...args} />;
Primary.args = {
  viewer: {
    id: 'id',
    alias: 'alias',
    displayName: 'DisplayName',
    avatar: '/.mock/avatar_1.png',
  },
};
