import { Injectable } from '@angular/core';
import { BaseStateService } from 'libraries/shared/src/lib/services/base-state.service';
import { AlbumStoreState, INITIAL_ALBUM_STORE_STATE } from './album.store';

@Injectable({
  providedIn: 'root'
})
export class AlbumStateService extends BaseStateService<AlbumStoreState> {

  constructor() {
    super();
    this.initialState();
   }
   initialState = (): AlbumStoreState => this.setState(INITIAL_ALBUM_STORE_STATE, 'INIT_STATE');
}
