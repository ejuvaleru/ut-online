import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  @ViewChild('navBurger', { static: false }) navBurger: ElementRef;
  @ViewChild('navMenu', { static: false }) navMenu: ElementRef;


  darkMode = false;

  constructor() { }

  ngOnInit() {
    this.storageDarkMode();
  }


  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
  storageDarkMode() {
    const darModeLocalStorage = localStorage.getItem('isDarkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (darModeLocalStorage && prefersDark) {
      this.darkMode = true;
      this.setDarkMode();
    }
  }


  cambio() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.setDarkMode();
    } else {
      document.body.classList.toggle('dark');
      localStorage.removeItem('isDarkMode');
    }

    this.toggleNavbar();
  }

  setDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('isDarkMode', 'true');
  }

}
