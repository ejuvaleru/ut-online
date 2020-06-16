export class FileUpload {
    id: string;
    objetoId: string;
    nombre: string;
    url: string;
    file: File;
    // Al crearse debe recibir un objeto de tipo File
    constructor(file: File) {
      this.file = file;
    }
  }