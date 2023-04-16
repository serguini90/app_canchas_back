import { ApiProperty } from "@nestjs/swagger";

export class ValidarDatosDto {
    @ApiProperty()
    correo: string;
    @ApiProperty()
    celular: string;
    @ApiProperty()
    idUsuario: string;
}