import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {Component} from './Completed';
import {FormValue} from './FormValue';

export default {
  title: 'RegisterForm/Completed',
  component: Component,
  argTypes: {
    registering: {table: {disable: true}},
    completed: {table: {disable: true}},
  },
} as Meta;

export const Primary: Story<ComponentProps<typeof Component>> = (args) => {
  const methods = useForm<FormValue>();
  return (
    <FormProvider {...methods}>
      <Component {...args} />
    </FormProvider>
  );
};
Primary.args = {
  alias: 'alias',
  displayName: 'DisplayName',
  avatar: '/.mock/avatar_1.png',
};
