import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumApiService {

  constructor(private httpClient: HttpClient) {
}

getAlbumById(id: string): Observable<any> {
  return this.httpClient.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
      }
    });    
}
}
