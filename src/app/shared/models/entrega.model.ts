import { Alumno } from './alumno.model';
import { Grupo } from './grupo.model';

export interface Entrega {
    id: string;
    comentarios: string;
    tareaID: string;
    calificacion: number; 
    alumno: Alumno;
    archivo: string; 
    alumnoId: string; 
}
