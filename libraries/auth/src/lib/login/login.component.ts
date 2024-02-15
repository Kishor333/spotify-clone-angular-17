import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ENVIRONMENT } from '../../../../../env';
import { Router } from '@angular/router';


@Component({
  selector: 'vibee-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  title = 'spotify-clone-angular-17';
  apiUrl = 'https://api.spotify.com/v1/albums';
  clientId = ENVIRONMENT.SPOTIFY_CLIENT_ID; // Replace with your client id
  params = new URLSearchParams(window.location.search);
  code = this.params.get('code');

  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('spotify_access_token') && localStorage.getItem('spotify_access_token') !== 'undefined') {
      this.router.navigate(['album']);
    }
    else await this.redirectToAuthCodeFlow(this.clientId);
  }

 

  async redirectToAuthCodeFlow(clientId: string): Promise<void> {
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
}
