import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  constructor(private httpClient: HttpClient) {}


  getMultipleAlbums(ids: string): Observable<{albums: Album[]}> {
    return this.httpClient.get(`https://api.spotify.com/v1/albums?ids=${ids}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
      }
    }) as Observable<{albums: Album[]}>;
  } 
}
