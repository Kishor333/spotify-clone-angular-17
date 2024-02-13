import { Injectable } from '@angular/core';
import { BaseStateService } from './base-state.service';
import { INITIAL_SHARED_STORE_STATE, SharedStoreState } from '../models/shared.store';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService extends BaseStateService<SharedStoreState> {
  constructor() {
    super();
    this.initialState();
  }

  initialState = (): SharedStoreState => this.setState(INITIAL_SHARED_STORE_STATE, 'INIT_STATE');
}
