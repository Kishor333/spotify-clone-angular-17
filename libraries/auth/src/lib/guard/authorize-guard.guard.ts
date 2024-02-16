import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ENVIRONMENT } from 'env';


@Injectable({ providedIn: 'root' })
export class AuthorizeGuard {
  constructor(
    public router: Router
  ) {}
  
  check = false;
  checkTokenExpiration(): boolean {
    const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
    let expiresAt = JSON.parse(localStorage.getItem('spotify') || '{}');
     // Calculate expiration time
    // console.log('current:',currentTime,'expires:' , expiresAt);
    // console.log('creating object', expiresAt?.expires_in);
    // console.log('creating object', JSON.parse(localStorage.getItem('spotify') || '{}')?.expires_in);

    //@ts-ignore
    console.log('leftover:',expiresAt?.expires_in - currentTime); 
    return expiresAt?.expires_in - currentTime < 60;
  
  }
  async canActivate(): Promise<boolean>{
    let ifTokenExpired = this.checkTokenExpiration();

     if (ifTokenExpired) {
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
        //  debugger
         if (response['access_token']) {
          //  debugger
          //  localStorage.setItem('spotify_access_token', response['access_token']);
           localStorage.setItem('spotify', JSON.stringify({
             access_token: response['access_token'],
             expires_in: Math.floor(Date.now() / 1000) + 3600
           }));
           //@ts-ignore
           localStorage.setItem('spotify_refresh_token', response['refresh_token']);
          this.router.navigate(['album']);
         }
       }
       
     }
    return Promise.resolve(true);
  }
  

}
