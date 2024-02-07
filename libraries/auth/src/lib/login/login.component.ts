import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// interface LoginForm {
//   email: string;
//   password: string;
// }

@Component({
  selector: 'spotify-clone-angular-17-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
      // email: new FormControl('', Validators.required),
      // password: new FormControl('', Validators.required),
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: ['']
    });
  }
  onSubmit():void {
    console.log(this.loginForm.value);
  }
}
