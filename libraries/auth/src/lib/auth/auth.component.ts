import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'spotify-clone-angular-17-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
      this.router.navigate(['album']);
  }
}
