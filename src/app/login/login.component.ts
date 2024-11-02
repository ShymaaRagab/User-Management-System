import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })
  isLoad: boolean = false;
  userToken: string='';
  errorMessage: any;

  submitLogin(loginForm: FormGroup) {
    this.isLoad = true;
    this.auth.signIn(loginForm.value).subscribe({
      next: (res) => {
        this.isLoad = false;
        this.userToken = res.accessToken;
        localStorage.setItem('userToken',JSON.stringify(this.userToken) );
        this.router.navigate(['/profile']);
      },
      error: (res) => {
        this.isLoad = false;
        this.errorMessage = res.error
      }
    });
  }
}
