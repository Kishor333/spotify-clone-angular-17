import { SharedStateService } from './shared-state.service';
import { BaseFacadeService } from './base-facade.service';
import { Injectable } from '@angular/core';
import { SharedStoreEnum } from '../models/shared.store';
import { SharedApiService } from './shared-api.service';
import { SharedBlService } from './shared-bl.service';

@Injectable({
  providedIn: 'root',
})
export class SharedFacadeService extends BaseFacadeService<SharedStateService, SharedStoreEnum> {
  constructor(private sharedApiService: SharedApiService,
              private sharedBlService: SharedBlService,
              private sharedStateService: SharedStateService) {
    super(sharedStateService);
  }
}
