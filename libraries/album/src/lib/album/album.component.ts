import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spotify-clone-angular-17-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent implements OnInit{
  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {

  }
}
