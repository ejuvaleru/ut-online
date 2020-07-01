// Modelo de materia

import { Grupo } from './grupo.model';
import { SafeUrl } from '@angular/platform-browser';

export interface Materia {
    id: string;
    nombre: string;
    horario: []; 
    profesorId: string; 
    archivo: string;
    envivo: boolean; 

}
