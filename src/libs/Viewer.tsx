import React, {useEffect} from 'react';
import gql from 'graphql-tag';

import {useGetViewerQuery} from './codegen';
import {useViewer} from './useViewer';

const GetViewerQuery = gql`
  query GetViewer {
    viewer {
      id
      alias
      displayName
    }
  }
`;

export const useLoadViewer = () => {
  const {viewer, setter} = useViewer();
  const [result] = useGetViewerQuery();

  const {data} = result;

  useEffect(
    () => {
      if (data?.viewer)
        setter({
          id: data.viewer.id,
          alias: data.viewer.alias,
          displayName: data.viewer.displayName,
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  return {viewer};
};

export const Viewer: React.VFC = () => {
  const {viewer} = useLoadViewer();
  return <></>;
};
