import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ENVIRONMENT } from 'env';


@Injectable({ providedIn: 'root' })
export class AuthorizeGuardGuard {
  constructor(
    public router: Router
  ) {}
  
  async canActivate(): Promise<boolean>{
     if(localStorage.getItem('spotify_refresh_token') && localStorage.getItem('spotify_refresh_token') !== 'undefined'){
      const [refreshToken, url] = [localStorage.getItem('spotify_refresh_token') || '', "https://accounts.spotify.com/api/token"];
       const payload = {
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: new URLSearchParams({
           grant_type: 'refresh_token',
           refresh_token: refreshToken,
           client_id: ENVIRONMENT.SPOTIFY_CLIENT_ID
         }),
       }
       const body = await fetch(url, payload);
       const response = await body.json();
       debugger
       if (response['access_token']) {
         debugger
         localStorage.setItem('spotify_access_token', response['access_token']);
         //@ts-ignore
         localStorage.setItem('spotify_refresh_token', response['refresh_token']);
       }
     }
     return Promise.resolve(true);
  } 
}
