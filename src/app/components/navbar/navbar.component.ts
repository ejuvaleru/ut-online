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

  constructor(private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn();
    this.isLogin.subscribe(res => {
      console.log('isLogin? ', res);
    });
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
}
