import gql from 'graphql-tag';
import {useEffect} from 'react';
import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

import {useGetViewerQuery} from './useViewer.codegen';

const UseViewerQuery = gql`
  query GetViewer {
    viewer {
      id
      alias
      displayName
    }
  }
`;

export type Viewer = {
  id: string;
  alias: string;
  displayName: string;
};

export const viewerState = atom<undefined | null | Viewer>({
  key: 'viewer',
  default: undefined,
});

export const useViewer = () => {
  const viewer = useRecoilValue(viewerState);
  const setViewer = useSetRecoilState(viewerState);

  const [result] = useGetViewerQuery();
  const {data, fetching} = result;

  useEffect(() => {
    if (!fetching && data?.viewer)
      setViewer({
        id: data.viewer.id,
        alias: data.viewer.alias,
        displayName: data.viewer.displayName,
      });
    else if (!fetching && !data?.viewer) setViewer(null);
  }, [data, fetching, setViewer]);

  return viewer;
};
