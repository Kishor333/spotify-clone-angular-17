import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Album } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  constructor(private httpClient: HttpClient, private router:Router) {}


  getMultipleAlbums(ids: string): Observable<{albums: Album[]}> {
    return this.httpClient.get(`https://api.spotify.com/v1/albums?ids=${ids}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('spotify') || '')?.expires_in}`
      }
    }) as Observable<{albums: Album[]}>;
  } 
}
