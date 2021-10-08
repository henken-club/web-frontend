import gql from 'graphql-tag';
import React, {useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {useFetchViewerQuery} from './codegen';
import {viewerState} from './useViewer';

import {useAuth} from '~/auth/useAuth';
import {RegisterForm} from '~/components/RegisterForm';

const FetchViewerQuery = gql`
  query FetchViewer {
    viewer {
      id
      alias
      displayName
      avatar
    }
  }
`;

export const ViewerFetcher: React.VFC = () => {
  const recoilSetter = useSetRecoilState(viewerState);
  const [result] = useFetchViewerQuery();

  const {data} = result;

  useEffect(() => {
    if (data?.viewer) {
      const {__typename, ...viewer} = data.viewer;
      recoilSetter(viewer);
    } else if (data?.viewer === null) recoilSetter(null);
  }, [data, recoilSetter]);

  return <></>;
};

export const AuthManager: React.VFC = () => {
  const {isAuthenticated} = useAuth();
  const viewer = useRecoilValue(viewerState);

  if (isAuthenticated && viewer) return <></>;
  else if (isAuthenticated && viewer === null)
    return (
      <>
        <RegisterForm />
      </>
    );
  else if (isAuthenticated && viewer === undefined)
    return (
      <>
        <ViewerFetcher />
      </>
    );
  else return <></>;
};
