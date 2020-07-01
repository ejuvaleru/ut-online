import { Grupo } from './grupo.model';
import { Materia } from './materia.model';

export interface Alumno {
    id: string;
    nombre: string;
    matrícula: string;
    grupoID: string; 
    materias: Materia[]
    entregas: [];
    entregasProyecto: [];
    calificaciones: [];

}
