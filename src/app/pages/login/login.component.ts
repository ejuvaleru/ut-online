import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  mensaje = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.setUpForm();
  }

  onSubmit() {
    const matricula = this.loginForm.get('matricula').value;
    const pass = this.loginForm.get('contrasenia').value;

    const res = this.authService.logIn(matricula, pass);

    if (res.code === 200) {
      this.login();
      this.generateToast(res.message, res.code);
    } else {
      this.generateToast(res.message, res.code);
    }
  }

  login() {
    this.authService.onLogin();
    localStorage.setItem('isLogin', 'true');
    this.router.navigateByUrl('/dashboard');
  }

  // Generate a little message to let the user know what is happening
  generateToast(message: string, code: number) {
    if (code === 200) {
      this.toast.success(message, 'Mensaje', { positionClass: 'toast-bottom-center', timeOut: 3000 });
    } else if (code === 400) {
      this.toast.error(message, 'Error', { positionClass: 'toast-bottom-center', timeOut: 3000 });
    }
  }

  setUpForm() {
    this.loginForm = this.fb.group({
      matricula: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}
