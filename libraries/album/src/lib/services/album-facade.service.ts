import { Injectable } from '@angular/core';
import { Album } from '@spotify-clone-angular-17/shared';
import { SharedStoreEnum } from 'libraries/shared/src/lib/models/shared.store';
import { Observable, mapTo, tap } from 'rxjs';
import { BaseFacadeService } from '../../../../shared/src/lib/services/base-facade.service';
import { AlbumApiService } from './album-api.service';
import { AlbumStateService } from './album-state.service';
import { AlbumStoreEnum } from './album.store';

@Injectable({
  providedIn: 'root'
})
export class AlbumFacadeService extends BaseFacadeService<AlbumStateService, AlbumStoreEnum>{

  constructor(private albumStateService: AlbumStateService, private albumApiService: AlbumApiService) {
    super(albumStateService)
  }
  // getMultipleAlbums(ids: string): Observable<boolean> {
  //   return this.sharedApiService.getMultipleAlbums(ids).pipe(tap((albums) => {
  //     this.updateSpecificState<Album[]>(albums.albums, SharedStoreEnum.ALBUMS);
  //   }), mapTo(true));
  // }
  getAlbumById(id: string): Observable<boolean> {
    return this.albumApiService.getAlbumById(id).pipe(tap((album) => {
      this.updateSpecificState<Album>(album, AlbumStoreEnum.ALBUM);
    }), mapTo(true));
  }
}
