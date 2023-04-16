import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    usuario: string;
    @ApiProperty()
    password: string;
}