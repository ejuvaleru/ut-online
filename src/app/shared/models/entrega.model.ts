import { Alumno } from './alumno.model';

export interface Entrega {
    id: string;
    comentarios: string;
    tareaID: string;
    calificacion: number; 
    alumno: Alumno;
    archivo: string; 
}
