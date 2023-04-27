import { Exclude } from "class-transformer";
import { Tabla } from "src/commons/tablas";
import { AfterLoad, AfterRecover, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ListaMedioPago } from "./lista-medio-pago.entity";
import { CanchaHorario } from "./cancha-horario.entity";

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

    @Exclude()
    listasmediospagos: ListaMedioPago;

    @Exclude()
    canchashorarios: CanchaHorario;

    // Transient
    metodoPago: string;

    direccion: string;

    precio: number;


    @AfterLoad()
    @AfterRecover()
    cargarTransient(){
        this.metodoPago = this.listasmediospagos ? this.listasmediospagos.nombre : null;
        this.direccion = (this.canchashorarios && this.canchashorarios.canchas) ? this.canchashorarios.canchas.direccion : null;
        this.precio = (this.canchashorarios && this.canchashorarios.canchas) ? this.canchashorarios.canchas.precio : null;
    }

    constructor(partial: Partial<Reserva>) {
        Object.assign(this, partial);
    }

}