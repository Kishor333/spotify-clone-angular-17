import { NgForOf } from '@angular/common';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { LoginComponent } from '@spotify-clone-angular-17/auth';
import { Album } from '@spotify-clone-angular-17/shared';
import { AlbumComponent } from 'libraries/album/src/lib/album/album.component';
import { SharedStoreEnum } from 'libraries/shared/src/lib/models/shared.store';
import { tap } from 'rxjs';
import { ENVIRONMENT } from '../../env';
import { SharedFacadeService } from '../../libraries/shared/src/lib/services/shared-facade.service';

@Component({
  standalone: true,
  imports: [ RouterModule, LoginComponent, AlbumComponent ],
  selector: 'spotify-clone-angular-17-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  albums:Album[] = [];
  clientId = ENVIRONMENT.SPOTIFY_CLIENT_ID; // Replace with your client id
  params = new URLSearchParams(window.location.search);
  code = this.params.get('code');
  
  constructor(private sharedFacadeService: SharedFacadeService, private router: Router){

  }

  ngOnInit(): void {
    this.checkIfAuthenticated();
    if (this.code) {
      this.getAccessToken(ENVIRONMENT.SPOTIFY_CLIENT_ID, this.code);
    }
    this.listenToStateAlums();
    if (localStorage.getItem('spotify_access_token') && localStorage.getItem('spotify_access_token') !== 'undefined') {
      this.router.navigate(['album']);
    }
    else {
      this.router.navigate(['login']);
    }
  }

  async getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem('verifier') || '';

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', 'http://localhost:4200/');
    params.append('code_verifier', verifier);

    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    const response = await result.json();
    debugger
    localStorage.setItem('spotify_access_token', response['access_token']);
    localStorage.setItem('spotify_refresh_token', response['refresh_token']);
    console.log(response);

    return response['access_token'];
  }

  checkIfAuthenticated(): void {
    if(!localStorage.getItem('spotify_access_token')){
      this.router.navigate(['login']);
    }
    else {
      this.getMultipleAlbums();
    }
  }

  getMultipleAlbums(): void {
    this.sharedFacadeService.getMultipleAlbums('382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc,6Z1zv6Hw9bdvSoxI5uYk2h').subscribe();
  }

  listenToStateAlums(): void {
    this.sharedFacadeService.specificStateChange<Album[]>('albums').pipe(tap((stateAlbums) => {
      this.albums = stateAlbums;
        console.log('whole Album:',this.albums);
    })).subscribe();

  }

  onAlbumClick(album: Album): void {
    // this.router.navigate([`album/${album.id}`], {relativeTo: this.activatedRoute});
  }
}
