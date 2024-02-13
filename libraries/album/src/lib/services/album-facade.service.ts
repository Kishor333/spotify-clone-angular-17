import { Injectable } from '@angular/core';
import { Album } from '@spotify-clone-angular-17/shared';
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

  getAlbumById(id: string): Observable<Album> {
    return this.albumApiService.getAlbumById(id);
  }
}
