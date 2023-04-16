import { Tabla } from "src/commons/tablas";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:Tabla.RESERVAS})
export class Reserva {
    
    @PrimaryGeneratedColumn('uuid')
    idReserva: string;

    @Column({type:'varchar', name:'IdUsuario'})
    idUsuario: string;

    @Column( { type: 'timestamp', name:'Fecha' } )
    fecha: Date;

    @Column({type:'varchar', name:'IdCanchaHorario'})
    idCanchaHorario: string;

    @Column({type:'varchar', name:'IdMedioPago'})
    idMedioPago: string;

    @Column( { type: 'tinyint', width: 1, name:'IndicadorHabilitado' } )
    indicadorHabilitado: boolean;
}