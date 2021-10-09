import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {FormValue} from './FormValue';

import {Component} from '.';

export default {
  title: 'RegisterForm',
  component: Component,
  argTypes: {
    registering: {table: {disable: true}},
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
Primary.storyName = '通常';
Primary.args = {
  registering: false,
};

export const Registering: Story<ComponentProps<typeof Component>> = (args) => {
  const methods = useForm<FormValue>();
  return (
    <FormProvider {...methods}>
      <Component {...args} />
    </FormProvider>
  );
};
Registering.storyName = '登録中';
Registering.args = {
  registering: true,
};

export const Completed: Story<ComponentProps<typeof Component>> = (args) => {
  const methods = useForm<FormValue>();
  return (
    <FormProvider {...methods}>
      <Component {...args} />
    </FormProvider>
  );
};
Completed.storyName = '登録完了';
Completed.args = {
  completed: {
    id: 'id',
    alias: 'alias',
    displayName: 'DisplayName',
    avatar: '/avatar_1.png',
  },
};
