import { Entrega } from './entrega.model';

export interface Tarea {
    id: string;
    nombre: string;
    instrucciones: string;
    archivo: string; 
    materiaId: string;   
    fechaEntrega: Date; 
}
