// Modelo de materia

import { Grupo } from './grupo.model';

export interface Materia {
    id: string;
    nombre: string;
    horario: string; 
    grupos: Grupo[];
    profesorId: string; 

}
