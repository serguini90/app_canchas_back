import { Exclude } from "class-transformer";
import { Tabla } from "src/commons/tablas";
import { AfterLoad, AfterRecover, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Cancha } from "./cancha.entity";

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

    @Exclude()
    canchas: Cancha;

    // Transient
    direccion: string;

    @AfterLoad()
    @AfterRecover()
    cargarTransient(){
        this.direccion = this.canchas ? this.canchas.direccion : null;
    }

    constructor(partial: Partial<CanchaHorario>) {
        Object.assign(this, partial);
    }
}