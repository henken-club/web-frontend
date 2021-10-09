import clsx from 'clsx';
import React, {useState} from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {gql} from 'graphql-request';

import {useRegisterUserMutation} from '../codegen';

import {Alias} from './inputs/Alias';
import {DisplayName} from './inputs/DisplayName';
import {Picture} from './inputs/Picture';
import {FormValue} from './FormValue';
import {useRegisterForm} from './useRegisterForm';

import {TimerBar} from '~/components/TimerBar';
import {IconLoading, IconRegister, IconRegistered} from '~/components/Icon';
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

export const Component: React.VFC<
  {
    className?: string;
    onSubmit(): void;
  } & ({completed: true} | {registering: boolean})
> = ({className, onSubmit, ...props}) => {
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
      {'completed' in props && (
        <div
          className={clsx(
            ['absolute', ['inset-0']],
            ['z-1'],
            [['bg-green-400'], ['bg-opacity-75']],
            ['flex', ['flex-col'], ['items-center'], ['justify-center']],
          )}
        >
          <IconRegistered className={clsx([['text-white'], ['text-4xl']])} />
          <span
            className={clsx('mt-4', [
              ['text-white'],
              ['text-base'],
              ['font-bold'],
            ])}
          >
            {LL.RegisterForm.Registered()}
          </span>
          <TimerBar
            className={clsx(['w-16'], ['h-1'], ['mt-2'], ['bg-white'])}
            duration={2000}
          />
        </div>
      )}
      <div className={clsx(['z-0'], ['flex', ['flex-col'], ['items-center']])}>
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
      <Picture
        className={clsx(['w-full'], ['mt-6'])}
        disabled={
          'completed' in props || ('registering' in props && props.registering)
        }
      />
      <Alias
        className={clsx(['w-full'], ['mt-4'])}
        disabled={
          'completed' in props || ('registering' in props && props.registering)
        }
      />
      <DisplayName
        className={clsx(['w-full'], ['mt-4'])}
        disabled={
          'completed' in props || ('registering' in props && props.registering)
        }
      />
      {!('completed' in props) && (
        <button
          className={clsx(
            ['mt-8'],
            ['inline-flex', ['items-center']],
            [['px-3'], ['py-1']],
            ['bg-blue-400', {'hover:bg-blue-600': !props.registering}],
            [['text-white'], ['text-base']],
            ['rounded-md'],
          )}
          type="submit"
          disabled={
            'completed' in props ||
            ('registering' in props && props.registering)
          }
        >
          {props.registering && (
            <>
              <IconLoading className={clsx(['text-sm'])} />
              <span className={clsx(['text-base'], ['ml-2'])}>
                {LL.RegisterForm.Registering()}
              </span>
            </>
          )}
          {!props.registering && (
            <>
              <IconRegister className={clsx(['text-sm'])} />
              <span className={clsx(['text-base'], ['ml-2'])}>
                {LL.RegisterForm.Submit()}
              </span>
            </>
          )}
        </button>
      )}
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
  const [completed, setCompleted] = useState<boolean>(false);
  const {hide} = useRegisterForm();

  const handleValid: SubmitHandler<FormValue> = async (value) =>
    register({
      alias: value.alias,
      displayName: value.displayName,
      avatar: value.picture,
    }).then((result) => {
      if (result.error) {
        console.error('Oh no!', result.error);
      } else {
        setCompleted(true);
        setTimeout(() => hide(), 2000);
      }
    });
  const handleInvalid: SubmitErrorHandler<FormValue> = (error) => {};

  return (
    <FormProvider {...methods}>
      <Component
        {...props}
        onSubmit={methods.handleSubmit(handleValid, handleInvalid)}
        {...(completed ? {completed: true} : {registering: fetching})}
      />
    </FormProvider>
  );
};
