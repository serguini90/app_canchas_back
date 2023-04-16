import { Tabla } from "src/commons/tablas";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:Tabla.CANCHASHORARIOS})
export class CanchaHorario {
    
    @PrimaryGeneratedColumn('uuid')
    idCanchaHorario: string;

    @Column({type:'varchar', name:'IdCancha'})
    idCancha: string;

    @Column({type:'varchar', name:'HoraInicio'})
    horaInicio: string;

    @Column({type:'varchar', name:'HoraFin'})
    horaFin: string;

    @Column( { type: 'tinyint', width: 1, name:'IndicadorHabilitado' } )
    indicadorHabilitado: boolean;
}