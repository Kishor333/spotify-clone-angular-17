

export enum AlbumStoreEnum {
  ALBUM = 'album'
}

export interface AlbumStoreState {
  [AlbumStoreEnum.ALBUM] : undefined,
}

export const INITIAL_ALBUM_STORE_STATE: AlbumStoreState = {
  [AlbumStoreEnum.ALBUM] : undefined,
};