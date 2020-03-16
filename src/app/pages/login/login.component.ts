import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setUpForm();
  }

  login() {
    this.authService.onLogin();
    localStorage.setItem('isLogin', 'true');
    this.router.navigateByUrl('/dashboard');
  }

  setUpForm() {
    this.loginForm = this.fb.group({
      matricula: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  onSubmit() {
    const matricula = this.loginForm.get('matricula').value;
    const pass = this.loginForm.get('contraseña').value
    console.log('LOGIN', matricula, pass);
    const res = this.authService.logIn(matricula, pass);
    console.log(res.code);
    console.log(res.message);
    if (res.code === 200) {
      this.login();
      console.log(res.message);
    }
  }
}
