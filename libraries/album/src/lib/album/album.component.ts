import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Album } from 'libraries/shared/src/lib/models/models';
import { SharedStoreEnum } from 'libraries/shared/src/lib/models/shared.store';
import { catchError, last, of, switchMap, take, tap, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SharedFacadeService } from '../../../../shared/src/lib/services/shared-facade.service';
import { AlbumFacadeService } from '../services/album-facade.service';
import { AlbumStoreEnum } from '../services/album.store';

@UntilDestroy()
@Component({
  selector: 'spotify-clone-angular-17-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  stateAlbum: Album[] = [] as Album[];
  selectedAlbum: Album = {} as Album;

  constructor(
    private albumFacadeService: AlbumFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private activateRoute: ActivatedRoute){}
  ngOnInit(): void {
    // this.getAlbumById();
    this.activateRoute.paramMap.subscribe((params) => {
      if(params.get('id')){
        console.log('calleds with id',params.get('id'));
        this.getAlbumById(params.get('id'));
        // this.singleAlbumListner();
        // console.log('click listner form album:',this.albumFacadeService.getSpecificState(AlbumStoreEnum.ALBUM));
      }
    });

    this.singleAlbumListner();

    this.stateAlbum = this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS);
    
    // console.log('Inside album component', this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS));
   
  }

  getAlbumById(albumId:any): void{
    this.albumFacadeService.getAlbumById(albumId).pipe(
      catchError( (error) => {
        return throwError('error form single', error)
      })
    ).subscribe();
  };

  singleAlbumListner():void {
    this.albumFacadeService.specificStateChange<Album>(AlbumStoreEnum.ALBUM).pipe(untilDestroyed(this), filter((album) => !!album),tap((stateAlbum) => {
      this.selectedAlbum = stateAlbum;
      // this.selectedAlbum = stateAlbum;
      console.log('single album',this.selectedAlbum.name);
    })).subscribe();
  };
}
