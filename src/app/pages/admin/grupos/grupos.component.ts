import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.component.html",
  styleUrls: ["./grupos.component.scss"],
})
export class GruposComponent implements OnInit {
  grupos = [];

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.afs
      .collection("grupos")
      .valueChanges()
      .subscribe((grupos) => {
        this.grupos = [];
        grupos.forEach((element) => {
          this.grupos.push(element);
        });
      });
  }
}
