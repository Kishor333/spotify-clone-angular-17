import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Album } from 'libraries/shared/src/lib/models/models';
import { AlbumFacadeService } from '../services/album-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';


@Component({
  selector: 'spotify-clone-angular-17-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  album!: Album;

  constructor(private albumFacadeService: AlbumFacadeService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.listenToRoutes();
  }

  listenToRoutes(): void {
    this.activatedRoute.params.pipe(switchMap((params) => {
      if (params['id']) {
        this.getAlbumById(params['id']);
      }
      return of(null);
    })).subscribe();
  }

  async getAlbumById(id: string): Promise<void> {
    this.albumFacadeService.getAlbumById(id).subscribe((album) => {
      this.album = album;
    });
  }
}
