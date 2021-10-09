import clsx from 'clsx';
import React from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {gql} from 'graphql-request';

import {useRegisterUserMutation} from '../codegen';
import {IconLoading, IconRegister} from '../Icon';

import {Alias} from './inputs/Alias';
import {DisplayName} from './inputs/DisplayName';
import {Picture} from './inputs/Picture';
import {FormValue} from './FormValue';

import {useTranslation} from '~/i18n/useTranslation';
import {useAuth} from '~/auth/useAuth';
import {LinkTos, LinkPrivacy} from '~/components/Link';

const RegisterFormMutation = gql`
  mutation RegisterUser(
    $alias: String!
    $avatar: String!
    $displayName: String!
  ) {
    registerUser(alias: $alias, avatar: $avatar, displayName: $displayName) {
      user {
        id
      }
    }
  }
`;

export const Component: React.VFC<{
  className?: string;
  onSubmit(): void;

  registering: boolean;
}> = ({className, onSubmit, registering: loading}) => {
  const {LL} = useTranslation();

  return (
    <form
      className={clsx(
        className,
        ['relative'],
        ['w-96'],
        [['px-6'], ['py-8']],
        ['inline-flex', ['flex-col'], ['items-center']],
        ['bg-gray-50'],
        ['overflow-hidden'],
        ['shadow-md'],
        ['rounded-md'],
      )}
      onSubmit={onSubmit}
    >
      {loading && (
        <div
          className={clsx(
            ['absolute', ['inset-0']],
            [['bg-black'], ['bg-opacity-25']],
            ['flex', ['flex-col'], ['items-center'], ['justify-center']],
          )}
        >
          <IconLoading className={clsx([['text-blue-400'], ['text-4xl']])} />
          <span className={clsx('mt-2', [['text-white'], ['text-sm']])}>
            {LL.RegisterForm.Registering()}
          </span>
        </div>
      )}
      <div className={clsx(['flex', ['flex-col'], ['items-center']])}>
        <span className={clsx(['text-lg'])}>{LL.RegisterForm.Title()}</span>
        <p className={clsx([['text-xs'], ['text-gray-700']], ['mt-2'])}>
          {LL.RegisterForm.Description()}
        </p>
        <div className={clsx(['mt-1'], ['space-x-2'], ['flex'])}>
          <LinkTos>
            <a
              className={clsx([['text-blue-400'], ['text-xs'], ['underline']])}
            >
              {LL.TermOfService()}
            </a>
          </LinkTos>
          <LinkPrivacy>
            <a
              className={clsx([['text-blue-400'], ['text-xs'], ['underline']])}
            >
              {LL.PrivacyPolicy()}
            </a>
          </LinkPrivacy>
        </div>
      </div>
      <Picture className={clsx(['w-full'], ['mt-6'])} disabled={loading} />
      <Alias className={clsx(['w-full'], ['mt-4'])} disabled={loading} />
      <DisplayName className={clsx(['w-full'], ['mt-4'])} disabled={loading} />
      <button
        className={clsx(
          ['mt-8'],
          ['inline-flex', ['items-center']],
          [['px-3'], ['py-1']],
          ['bg-blue-400', 'hover:bg-blue-600'],
          [['text-white'], ['text-base']],
          ['rounded-md'],
        )}
        type="submit"
        disabled={loading}
      >
        <IconRegister className={clsx(['text-sm'])} />
        <span className={clsx(['text-base'], ['ml-2'])}>
          {LL.RegisterForm.Submit()}
        </span>
      </button>
    </form>
  );
};

export const RegisterForm: React.VFC<{className?: string}> = ({...props}) => {
  const {user} = useAuth();
  const methods = useForm<FormValue>({
    defaultValues: {displayName: user?.name, picture: user?.picture},
  });
  const [result, register] = useRegisterUserMutation();
  const {fetching} = result;

  const handleValid: SubmitHandler<FormValue> = async (value) => {
    await register({
      alias: value.alias,
      displayName: value.displayName,
      avatar: value.picture,
    });
  };
  const handleInvalid: SubmitErrorHandler<FormValue> = (error) => {};

  return (
    <FormProvider {...methods}>
      <Component
        {...props}
        onSubmit={methods.handleSubmit(handleValid, handleInvalid)}
        registering={fetching}
      />
    </FormProvider>
  );
};
