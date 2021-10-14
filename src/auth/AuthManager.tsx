import gql from 'graphql-tag';
import React, {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';

import {useFetchViewerQuery} from './codegen';
import {viewerState} from './useViewer';

import {useAuth} from '~/auth/useAuth';

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

export const Viewer: React.VFC = () => {
  const {isAuthenticated} = useAuth();
  const recoilSetter = useSetRecoilState(viewerState);
  const [result] = useFetchViewerQuery({pause: !isAuthenticated});

  const {data} = result;

  useEffect(() => {
    if (data?.viewer) {
      const {__typename, ...viewer} = data.viewer;
      recoilSetter(viewer);
    } else if (data?.viewer === null) {
      recoilSetter(null);
    }
  }, [data, recoilSetter]);

  return <></>;
};
