import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  user: any;
  modal = false;


  constructor() { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('estudiante'));

  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
