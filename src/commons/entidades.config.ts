import { CanchaHorario } from "src/entities/cancha-horario.entity";
import { Cancha } from "src/entities/cancha.entity";
import { ListaMedioPago } from "src/entities/lista-medio-pago.entity";
import { Reserva } from "src/entities/reserva.entity";
import { Usuario } from "src/entities/usuario.entity";

export function obtenerEntidades(){
    return [Usuario, Cancha, CanchaHorario, ListaMedioPago, Reserva];
}