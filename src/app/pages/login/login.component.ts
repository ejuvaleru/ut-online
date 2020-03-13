import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // loginForm: F

  constructor(
    private router: Router,
    // private fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.onLogin();
    localStorage.setItem('isLogin', 'true');
    this.router.navigateByUrl('/dashboard');
  }
}
