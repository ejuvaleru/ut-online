import { Component, OnInit } from '@angular/core';
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
      this.mensaje = res.message;
      this.toast.success(this.mensaje, 'Mensaje', { positionClass: 'toast-bottom-center', timeOut: 3000 });
    } else {
      this.mensaje = res.message;
      this.toast.error(this.mensaje, 'Error', { positionClass: 'toast-bottom-center', timeOut: 3000 });
    }
  }
}
