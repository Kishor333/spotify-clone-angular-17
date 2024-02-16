import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '@spotify-clone-angular-17/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumApiService {

  constructor(private httpClient: HttpClient) {
}

getAlbumById(id: string): Observable<Album> {
  return this.httpClient.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('spotify') || '')?.expires_in}`
      }
    }) as unknown as Observable<Album>;  
}
}
