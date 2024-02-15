import { Album } from './models';
export enum SharedStoreEnum {
  ALBUMS = 'albums',
  ALBUM = 'album'
}

export interface SharedStoreState {
  [SharedStoreEnum.ALBUMS]: [];
  [SharedStoreEnum.ALBUM] : [],
}

export const INITIAL_SHARED_STORE_STATE: SharedStoreState = {
  [SharedStoreEnum.ALBUMS] : [],
  [SharedStoreEnum.ALBUM] : [],
};
