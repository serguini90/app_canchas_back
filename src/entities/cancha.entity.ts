import { Tabla } from "src/commons/tablas";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:Tabla.CANCHAS})
export class Cancha {
    
    @PrimaryGeneratedColumn('uuid')
    idCancha: string;

    @Column({type:'varchar', name:'IdUsuario'})
    idUsuario: string;

    @Column({type:'int', name:'CantidadJugadores'})
    cantidadJugadores: number;

    @Column({type:'int', name:'Precio'})
    precio: number;

    @Column({type:'varchar', name:'Direccion'})
    direccion: string;

    @Column( { type: 'tinyint', width: 1, name:'IndicadorHabilitado' } )
    indicadorHabilitado: boolean;
}