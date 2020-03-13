import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ut-online';
  isLogin: Observable<boolean>;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }


  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn();
    this.isLogin.subscribe(res => {
      console.log('isLogin? ', res);
    });
  }

  logOut() {
    localStorage.removeItem('isLogin');
    console.log(this.isLogin);
    this.authService.onLogout();
    this.router.navigateByUrl('/login');
  }
}
