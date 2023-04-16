import { ApiProperty } from "@nestjs/swagger";

export class ValidarUsuarioDto {
    @ApiProperty()
    usuario: string;
}