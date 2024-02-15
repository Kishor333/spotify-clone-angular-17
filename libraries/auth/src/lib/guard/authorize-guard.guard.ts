import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ENVIRONMENT } from 'env';


@Injectable({ providedIn: 'root' })
export class authorizeGuardGuard {
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
       const response = await await body.json();
       console.log('Inside guard',response);
       debugger
   
       //@ts-ignore
       localStorage.setItem('spotify_access_token', body['access_token']);
       //@ts-ignore
       localStorage.setItem('spotify_refresh_token', body.refreshToken);
     }
     return Promise.resolve(true);
  } 
}
  