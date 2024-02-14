import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginComponent } from '@spotify-clone-angular-17/auth';
import { Album } from '@spotify-clone-angular-17/shared';
import { SharedFacadeService } from '../../libraries/shared/src/lib/services/shared-facade.service';
import { NgForOf } from '@angular/common';
import { AlbumComponent } from '@spotify-clone-angular-17/album';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent, NgForOf, AlbumComponent],
  selector: 'spotify-clone-angular-17-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  albums:Album[] = [];
  
  constructor(private sharedFacadeService: SharedFacadeService, private router: Router, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    if(localStorage.getItem('spotify_access_token')){
      this.sharedFacadeService.getMultipleAlbums('382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc,6Z1zv6Hw9bdvSoxI5uYk2h')
      .subscribe((albums)=>{
        this.albums = albums.albums;
        console.log('whole Album:',albums);
      }, (errResponse) => {
        if (errResponse['error']['error'].status === 401) {
          console.log('I am expired')
        }
      })
    }
  }

  onAlbumClick(album: Album): void {
    this.router.navigate([`album/${album.id}`], {relativeTo: this.activatedRoute});
  }
}
