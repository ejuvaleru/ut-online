import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('menuHamburger', { static: true }) menuHamburger: ElementRef;
  @ViewChild('navbarItems', { static: true }) navbarItems: ElementRef;

  isLogin: Observable<boolean>;
  user: any;

  date: Date;
  time;

  greeting = '';

  constructor(private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn();
    this.isLogin.subscribe(res => {
      console.log('isLogin? ', res);
      this.setUpGreeting();
    });
    this.user = JSON.parse(localStorage.getItem('estudiante'));
  }

  toggleNavbar() {
    this.menuHamburger.nativeElement.classList.toggle('is-active');
    this.navbarItems.nativeElement.classList.toggle('is-active');
  }
  toggleNavbarNo() {
    this.menuHamburger.nativeElement.classList.toggle('is-active');
    this.navbarItems.nativeElement.classList.toggle('is-active');
  }

  logOut() {
    this.toggleNavbarNo();
    localStorage.removeItem('isLogin');
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
