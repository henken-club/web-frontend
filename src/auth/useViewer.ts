import {atom, useRecoilValue} from 'recoil';

export type Viewer = {
  id: string;
  alias: string;
  displayName: string;
  avatar: string;
};

export const viewerState = atom<undefined | null | Viewer>({
  key: 'viewer',
  default: undefined,
});

export const useViewer = (): Viewer | null | undefined => {
  const viewer = useRecoilValue(viewerState);
  return viewer;
};
