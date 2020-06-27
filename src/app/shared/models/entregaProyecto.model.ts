import { Alumno } from './alumno.model';

export interface EntregaProyecto {
    id: string;
    comentarios: string;
    proyectoID: string;
    calificación: number; 
    alumno: Alumno;
}
