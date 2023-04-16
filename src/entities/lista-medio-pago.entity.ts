import { Tabla } from "src/commons/tablas";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:Tabla.LISTASMEDIOSPAGOS})
export class ListaMedioPago {
    
    @PrimaryGeneratedColumn('uuid')
    idLista: string;

    @Column({type:'varchar', name:'Codigo'})
    codigo: string;

    @Column({type:'varchar', name:'Nombre'})
    nombre: string;

    @Column( { type: 'tinyint', width: 1, name:'IndicadorHabilitado' } )
    indicadorHabilitado: boolean;
}
