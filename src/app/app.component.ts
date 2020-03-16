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

  user: any;
  greeting = '';

  date: Date;
  time;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }


  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn();
    this.isLogin.subscribe(res => {
      console.log('isLogin? ', res);
      this.user = JSON.parse(localStorage.getItem('estudiante'));
      this.setUpGreeting();
    });
  }

  logOut() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('estudiante');
    console.log(this.isLogin);
    this.authService.onLogout();
    this.router.navigateByUrl('/login');
  }

  setUpGreeting() {
    this.date = new Date();
    this.time = this.date.getHours();
    console.log(this.time);
    if (this.time > 4 && this.time < 12) {
      this.greeting = 'Buenos días';
      console.log('Good morning!');
    } else if (this.time > 12 && this.time <= 19) {
      this.greeting = 'Buenas tardes';
      console.log('Good arfternoon!');
    } else {
      this.greeting = 'Buenas noches';
      console.log('Good evening!!')
    }
  }
}
