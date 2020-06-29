import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SubjectService } from "src/app/shared/subject.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { DomSanitizer } from "@angular/platform-browser";
import { VideoGrabado } from "src/app/shared/models/videoGrabado.model";
import { Materia } from "src/app/shared/models/materia.model";

@Component({
  selector: "app-video-grabado",
  templateUrl: "./video-grabado.component.html",
  styleUrls: ["./video-grabado.component.scss"],
})
export class VideoGrabadoComponent implements OnInit {
  idSubject = "";
  subjectElement = {} as Materia;
  curso: any;
  videos = [];
  video = {} as VideoGrabado;
  enlace = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.idSubject = this.route.snapshot.paramMap.get("id");

    this.afs
      .collection("clases-grabadas", (ref) =>
        ref.where("idMateria", "==", this.idSubject)
      )
      .valueChanges()
      .subscribe((res: any) => {
        this.videos = [];
        res.forEach((e: VideoGrabado) => {
          this.videos.push(e as VideoGrabado);
        });

        this.video = this.videos[0];
      });

    this.afs
      .collection("materias")
      .doc(this.idSubject)
      .valueChanges()
      .subscribe((res: any) => {
        this.subjectElement = res;
      });
  }

  safeUrl(url) {
    console.log(url + "Este es el URL");
    console.log("https://www.youtube.com/embed/"+this.video.enlace.slice(32,43))
    
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.video.enlace.slice(32,43));
  }

  cambiarVideo(video: VideoGrabado) {
    this.video = video;
    console.log(this.video, "SOY EL LINK");
  }
}
