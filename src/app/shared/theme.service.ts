import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkTheme = new BehaviorSubject<boolean>(this.checkDarkTheme());

  checkDarkTheme(): boolean {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(prefersDark);
    if (prefersDark.matches || localStorage.getItem('isDarkMode')) {
      console.log(localStorage.getItem('isDarkMode'));
      document.body.classList.toggle('dark');
      return true;
    }
  }

}
