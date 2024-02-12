import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'spotify-clone-angular-17-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'spotify-clone-angular-17';
  apiUrl = '';
  clientId = 'ae03b3b15f354f278d9516bccac5f1e8'; // Replace with your client id
  params = new URLSearchParams(window.location.search);
  code = this.params.get('code');

  constructor(private http: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.code) {
      this.redirectToAuthCodeFlow(this.clientId);
    } else {
      await this.getAccessToken(this.clientId, this.code);
      this.getAlbumById();
    }
  }

  async getAlbumById(): Promise<void> {
    const album = await this.http.get(`${this.apiUrl}/4aawyAB9vmqN3uQ7FjRGTy`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}`
      }
    }).toPromise();
    console.log(album);
  }

  async redirectToAuthCodeFlow(clientId: string) {
    const verifier = this.generateCodeVerifier(128);
    const challenge = await this.generateCodeChallenge(verifier);

    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', 'http://localhost:4200/');
    params.append('scope', 'user-read-private user-read-email');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  generateCodeVerifier(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
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
    localStorage.setItem('spotify_access_token', response['access_token']);
    console.log(response);

    return response['access_token'];
  }

}
