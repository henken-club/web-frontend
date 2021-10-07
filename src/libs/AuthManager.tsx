import {useAuth0} from '@auth0/auth0-react';
import gql from 'graphql-tag';
import React, {useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {useGetViewerQuery} from './codegen';
import {RegisterForm} from './RegisterForm';
import {viewerState} from './useViewer';

const GetViewerQuery = gql`
  query GetViewer {
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
  const [result] = useGetViewerQuery();

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
  const {isAuthenticated} = useAuth0();
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
