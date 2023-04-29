import { ApiProperty } from "@nestjs/swagger";

export class ReservaDto {
    @ApiProperty()
    idReserva: string;
    @ApiProperty()
    idUsuario: string;
    @ApiProperty()
    fecha: Date;
    @ApiProperty()
    idCanchaHorario: string;
    @ApiProperty()
    idMedioPago: string;
    @ApiProperty()
    indicadorHabilitado: boolean;

    metodoPago: string;
    direccion: string;
    precio: number;
    horaInicio: string;
    horaFin: string;
}