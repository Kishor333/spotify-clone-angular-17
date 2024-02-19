import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Album } from 'libraries/shared/src/lib/models/models';
import { SharedStoreEnum } from 'libraries/shared/src/lib/models/shared.store';
import { SharedFacadeService } from '../../../../shared/src/lib/services/shared-facade.service';
import { AlbumFacadeService } from '../services/album-facade.service';

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
  selectedStateAlbum: Album[] = [] as Album[];
  selectedAlbum: Album = {} as Album;

  constructor(
    private albumFacadeService: AlbumFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private activateRoute: ActivatedRoute){}
  ngOnInit(): void {
    console.log(this.selectedStateAlbum.length, ':type1')
    // this.getAlbumById();
    this.activateRoute.paramMap.subscribe((params) => {
      if(params.get('id')){
        console.log('calleds with id',params.get('id'));
        this.getSingleAlbum(params.get('id'));
      }
    });

    // this.singleAlbumListner();

    this.stateAlbum = this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS);
    
    // console.log('Inside album component', this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS));
   
  }

  getSingleAlbum(id:any):void {
    console.log('pressed', id);
    // this.selectedAlbum = this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS).find((album) => album.id === id);
    //@ts-ignore
    this.selectedStateAlbum = this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS).find((album) => album.id === id);
    // this.selectedAlbum = this.selectedStateAlbum.find(album => album.id === id);
    this.selectedAlbum = Object(this.selectedStateAlbum);
    
    console.log('selected:',Object(this.selectedStateAlbum) )
    console.log(this.selectedStateAlbum.length, ':type2')
    // this.getAlbumById(id);
        

  }

 //fetch Api and save in store
  // getAlbumById(albumId:any): void{
  //   this.albumFacadeService.getAlbumById(albumId).pipe(
  //     catchError( (error) => {
  //       return throwError('error form single', error)
  //     })
  //   ).subscribe();
  // };

  // singleAlbumListner():void {
  //   this.albumFacadeService.specificStateChange<Album>(AlbumStoreEnum.ALBUM).pipe(untilDestroyed(this), filter((album) => !!album),tap((stateAlbum) => {
  //     this.selectedAlbum = stateAlbum;
  //     // this.selectedAlbum = stateAlbum;
  //     console.log('single album',this.selectedAlbum.name);
  //   })).subscribe();
  // };
}
