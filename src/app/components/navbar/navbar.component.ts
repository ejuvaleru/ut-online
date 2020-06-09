import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/shared/theme.service';

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
  rol: any;

  date: Date;
  time;

  greeting = '';

  darkMode: boolean = true;

  constructor(private router: Router,
    public authService: AuthService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.themeService.checkDarkTheme();

    const prefersDark = this.themeService.checkDarkTheme();;
    this.darkMode = prefersDark;

    this.isLogin = this.authService.isLoggedIn();
    this.isLogin.subscribe(res => {
      console.log('isLogin? ', res);
      this.setUpGreeting();
    });
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.rol = this.authService.getTypeOfUser(this.user.schoolId, this.user.password);
    console.log(this.rol, 'ROOOOL');
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
    localStorage.removeItem('usuario');
    console.log(this.isLogin);
    this.authService.onLogout();
    this.router.navigateByUrl('/educacion_a_distancia');
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

  cambio() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.toggle('dark');
      localStorage.setItem('isDarkMode', 'true');
    } else {
      document.body.classList.toggle('dark');
      localStorage.removeItem('isDarkMode');
    }
  }
}
