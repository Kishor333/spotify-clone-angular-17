import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { LoginComponent } from '@spotify-clone-angular-17/auth';
import { Album } from '@spotify-clone-angular-17/shared';
import { AlbumComponent } from 'libraries/album/src/lib/album/album.component';
import { catchError, tap, throwError } from 'rxjs';
import { ENVIRONMENT } from '../../env';
import { AuthorizeGuard } from '../../libraries/auth/src/lib/guard/authorize-guard.guard';
import { SharedFacadeService } from '../../libraries/shared/src/lib/services/shared-facade.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { PrimeTemplate } from 'primeng/api';

@Component({
  standalone: true,
  imports: [RouterModule, LoginComponent, AlbumComponent, NgForOf, ProgressBarModule],
  selector: 'spotify-clone-angular-17-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  albums:Album[] = [];
  params = new URLSearchParams(window.location.search);
  code = this.params.get('code');
  
  constructor(
    private sharedFacadeService: SharedFacadeService,
    private router: Router,
    private authorizeGuardGuard: AuthorizeGuard,
    private activatedRoute: ActivatedRoute){

  }

  async ngOnInit(): Promise<void> {
    const stringifiedAsccessToken = localStorage.getItem('spotify') || '{}';
    const accessToken = JSON.parse(stringifiedAsccessToken)?.access_token;
    await this.refreshToken();
    
    if (this.code) {
      await this.getAccessToken(ENVIRONMENT.SPOTIFY_CLIENT_ID, this.code).then(() => {
        this.getMultipleAlbums();
        this.router.navigate(['album']);
      });
    }
    else if (accessToken && accessToken !== 'undefined') {
      // this.router.navigate(['album']);
      this.getMultipleAlbums();
    }
    else {
      this.router.navigate(['login']);
    }
    this.listenToStateAlums();
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
    if (response['access_token']) {
      // localStorage.setItem('spotify_access_token', response['access_token']);
      localStorage.setItem('spotify', JSON.stringify({
        access_token: response['access_token'],
        expires_in: Math.floor(Date.now() / 1000) + 3600
      }));
      localStorage.setItem('spotify_refresh_token', response['refresh_token']);
    }
    return response['access_token'];
  }

  async refreshToken(): Promise<void> {
    
    if(localStorage.getItem('spotify_refresh_token') && localStorage.getItem('spotify_refresh_token') !== 'undefined'){
      await this.authorizeGuardGuard.canActivate();
    }
  }

  getMultipleAlbums(): void {
    this.sharedFacadeService.getMultipleAlbums('53GL8FLJc2aubIc98hVAYq,46ksJlfXcOQTlSUo7EWIYE,6mf8OEVjN1rdUky9od49Fm,2fenSS68JI1h4Fo296JfGr,7MD7nrObKhCuIx39qmRqq8,7Hj790INqI9oXSuP0P4Y2o,4htLxSjMjbAyF43G7M5nqN,6Z1zv6Hw9bdvSoxI5uYk2h,6Z1zv6Hw9bdvSoxI5uYk2h,6Z1zv6Hw9bdvSoxI5uYk2h,6Z1zv6Hw9bdvSoxI5uYk2h,6Z1zv6Hw9bdvSoxI5uYk2h,6Z1zv6Hw9bdvSoxI5uYk2h,6Z1zv6Hw9bdvSoxI5uYk2h,6Z1zv6Hw9bdvSoxI5uYk2h')
    .pipe(
     
      catchError( async (error) => {
        
        // if (error.status === 401) {
        //    console.error('Spotify API error (401):', error.error);
        //   //  this.router.navigate(['/login']);
        //   // await this.authorizeGuardGuard.canActivate();
        //    return throwError(new Error('Spotify access token expired or invalid'));
           
        // }
         if (error.status >= 400) {
          console.error('Spotify API error kishor:', error.error);
          return throwError(error);
        } 
        else {
          return throwError(error);
        }
      })
    ).subscribe();
  }

  listenToStateAlums(): void {
    this.sharedFacadeService.specificStateChange<Album[]>('albums').pipe(tap((stateAlbums) => {
      this.albums = stateAlbums;
    })).subscribe();

  }

  onAlbumClick(album: Album): void {
    // this.sharedFacadeService.s
    this.router.navigate([`album/${album.id}`], {relativeTo: this.activatedRoute});
    // console.log(album);
  }
}
