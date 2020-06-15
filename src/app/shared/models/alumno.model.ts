import { Grupo } from './grupo.model';

export interface Alumno {
    id: string;
    nombre: string;
    matrícula: string;
    grupo: Grupo; 

}
