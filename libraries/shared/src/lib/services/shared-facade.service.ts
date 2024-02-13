import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedStoreEnum } from '../models/shared.store';
import { BaseFacadeService } from './base-facade.service';
import { SharedApiService } from './shared-api.service';
import { SharedBlService } from './shared-bl.service';
import { SharedStateService } from './shared-state.service';

@Injectable({
  providedIn: 'root',
})
export class SharedFacadeService extends BaseFacadeService<SharedStateService, SharedStoreEnum> {
  constructor(private sharedApiService: SharedApiService,
              private sharedBlService: SharedBlService,
              private sharedStateService: SharedStateService) {
    super(sharedStateService);
  }

  getMultipleAlbums(ids: string): Observable<any> {
    return this.sharedApiService.getMultipleAlbums(ids);
  }
}
