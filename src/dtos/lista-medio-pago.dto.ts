import { ApiProperty } from "@nestjs/swagger";

export class ListaMedioPagoDto {
    @ApiProperty()
    idLista: string;
    @ApiProperty()
    codigo: string;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    indicadorHabilitado: boolean;
}
