import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDto {
    @ApiProperty()
    idUsuario: string;
    @ApiProperty()
    usuario: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    celular: string;
    @ApiProperty()
    correo: string;
    @ApiProperty()
    indicadorProveedor: boolean;
    @ApiProperty()
    indicadorHabilitado: boolean;
}