import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'libraries/shared/src/lib/models/models';
import { SharedStoreEnum } from 'libraries/shared/src/lib/models/shared.store';
import { of, switchMap } from 'rxjs';
import { SharedFacadeService } from '../../../../shared/src/lib/services/shared-facade.service';
import { AlbumFacadeService } from '../services/album-facade.service';


@Component({
  selector: 'spotify-clone-angular-17-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit{
  stateAlbum: Album[] = [] as Album[];

  constructor(
    private albumFacadeService: AlbumFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private activateRoute: ActivatedRoute){}
  ngOnInit(): void {
    // this.getAlbumById();
    this.activateRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      // get
    })
    console.log(this.activateRoute.snapshot.paramMap.get('id'));
    this.stateAlbum = this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS);
    console.log('Inside album component', this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS));
  }

  
  async getAlbumById(): Promise<void> {
    this.albumFacadeService.getAlbumById('4aawyAB9vmqN3uQ7FjRGTy').subscribe((album) => {
      // this.album = album;
      console.log(album);
    });
  }
}
