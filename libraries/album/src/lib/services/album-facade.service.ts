import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseFacadeService } from '../../../../shared/src/lib/services/base-facade.service';
import { AlbumApiService } from './album-api.service';
import { AlbumStateService } from './album-state.service';
import { AlbumStore } from './album.store';

@Injectable({
  providedIn: 'root'
})
export class AlbumFacadeService extends BaseFacadeService<AlbumStateService, AlbumStore>{

  constructor(private albumStateService: AlbumStateService, private albumApiService: AlbumApiService) {
    super(albumStateService)
  }

  getAlbumById(id: string): Observable<any> {
    return this.albumApiService.getAlbumById(id);
  }
}
