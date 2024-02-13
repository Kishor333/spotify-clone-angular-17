import { Injectable } from '@angular/core';
import { BaseFacadeService } from '../../../../shared/src/lib/services/base-facade.service';
import { AlbumStateService } from './album-state.service';
import { AlbumStore } from './album.store';

@Injectable({
  providedIn: 'root'
})
export class AlbumFacadeService extends BaseFacadeService<AlbumStateService, AlbumStore>{

  constructor(private albumStateService: AlbumStateService) {
    super(albumStateService)
  }
}
