import { Alumno } from './alumno.model';

export interface Entrega {
    id: string;
    comentarios: string;
    tareaID: string;
    calificación: number; 
    alumno: Alumno;
}
