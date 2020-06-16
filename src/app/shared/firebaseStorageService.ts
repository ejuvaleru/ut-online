import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FirebaseStorageService {
  constructor(
    private storage: AngularFireStorage,
    public afs: AngularFirestore // Referencia a Firestore
  ) {}

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  public saveFirestore(url: string, coleccion: string, id: string) {
    return this.afs.doc(`${coleccion}/${id }`).update({
      archivo: url,
    });
  }
}
