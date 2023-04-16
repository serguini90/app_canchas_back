import { ApiProperty } from "@nestjs/swagger";

export class CanchaDto {
    @ApiProperty()
    idCancha: string;
    @ApiProperty()
    idUsuario: string;
    @ApiProperty()
    cantidadJugadores: number;
    @ApiProperty()
    precio: number;
    @ApiProperty()
    direccion: string;
    @ApiProperty()
    indicadorHabilitado: boolean;
}