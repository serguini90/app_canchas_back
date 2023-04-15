import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Tabla } from "src/commons/tablas";

@Entity({name:Tabla.USUARIOS})
export class Usuario {
    
    @PrimaryGeneratedColumn('uuid')
    idUsuario: string;

    @Column({type:'varchar', name:'Usuario'})
    usuario: string;

    @Exclude()
    @Column({type:'varchar', name:'Password'})
    password: string;

    @Column({type:'varchar', name:'Celular'})
    celular: string;

    @Column({type:'varchar', name:'Correo'})
    correo: string;

    @Column( { type: 'tinyint', width: 1, name:'IndicadorHabilitado' } )
    indicadorHabilitado: boolean;

    constructor(partial: Partial<Usuario>) {
        Object.assign(this, partial);
    }
}


