import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

export type Viewer = {
  id: string;
  alias: string;
  displayName: string;
};

export const viewerState = atom<undefined | null | Viewer>({
  key: 'viewer',
  default: undefined,
});

export const useViewer = (): {
  viewer: Viewer | null | undefined;
  setter: (value: Viewer | null) => void;
} => {
  const viewer = useRecoilValue(viewerState);

  const recoilSetter = useSetRecoilState(viewerState);
  const setter = (value: Viewer | null) => recoilSetter(value);

  return {viewer, setter};
};
