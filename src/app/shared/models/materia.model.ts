// Modelo de materia

import { Grupo } from './grupo.model';
import { SafeUrl } from '@angular/platform-browser';

export interface Materia {
    id: string;
    nombre: string;
    horario: string; 
    grupos: Grupo[];
    profesorId: string; 
    archivo: string;

}
