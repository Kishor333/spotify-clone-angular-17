import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Album } from 'libraries/shared/src/lib/models/models';
import { AlbumFacadeService } from '../services/album-facade.service';



@Component({
  selector: 'spotify-clone-angular-17-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent implements OnInit{
  album: Album = {} as Album;

  constructor(private albumFacadeService: AlbumFacadeService){}
  ngOnInit(): void {
    this.getAlbumById();
  }

  
  async getAlbumById(): Promise<void> {
    this.albumFacadeService.getAlbumById('4aawyAB9vmqN3uQ7FjRGTy').subscribe((album) => {
      this.album = album;
      console.log(album);
    });
  }

  // async getMultipleAlbums(): Promise<void> {
  //   this.albumFacadeService.getAlbumById('4aawyAB9vmqN3uQ7FjRGTy').subscribe((album) => {
  //     this.album = album;
  //     console.log(album);
  //   });
  // }
}
