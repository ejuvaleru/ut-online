import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;
  modal = false;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
