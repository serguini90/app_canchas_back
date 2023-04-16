import { ApiProperty } from "@nestjs/swagger";

export class CanchaHorarioDto {
    @ApiProperty()
    idCanchaHorario: string;
    @ApiProperty()
    idCancha: string;
    @ApiProperty()
    horaInicio: string;
    @ApiProperty()
    horaFin: string;
    @ApiProperty()
    indicadorHabilitado: boolean;
}