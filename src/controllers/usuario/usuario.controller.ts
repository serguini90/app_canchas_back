import { Body, ClassSerializerInterceptor, Controller, Get, Put, Param, Post, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { MensajesExcepcion } from 'src/commons/enum';
import { Public } from 'src/decorator/public.decorator';
import { LoginDto } from 'src/dtos/login.dto';
import { UsuarioDto } from 'src/dtos/usuario.dto';
import { ValidarDatosDto } from 'src/dtos/validar-datos.dto';
import { ValidarUsuarioDto } from 'src/dtos/validar-usuario.dto';
import { JwtPayload } from 'src/models/jwt-payload';
import { Respuesta } from 'src/models/respuesta';
import { NotificacionService } from 'src/services/notificacion.service';
import { UsuarioService } from 'src/services/usuario.service';
import {v4 as uuidv4} from 'uuid';

@ApiTags('usuario')
@ApiBearerAuth()
@Controller('usuario')
export class UsuarioController {

    constructor(private readonly userService: UsuarioService,
        private notificacionService: NotificacionService) {}
    
      
    @Post()
    @Public()
    async create(@Body() usuario: UsuarioDto): Promise<UsuarioDto>  {
        usuario.indicadorProveedor = !!usuario.indicadorProveedor;
        const userGuardar = { ...usuario, password: await this.userService.obtenerPassword(usuario.password) };
        const userDB = await this.userService.create(userGuardar);
        delete userDB.password;
        await this.enviarCorreoNuevoUsuario(userDB);
        return userDB;
      }
    
      @Get()
      @UseInterceptors(ClassSerializerInterceptor)
      findAll(): Promise<UsuarioDto[]>  {
        return this.userService.findAll();
      }
      
      @Get('enabled')
      @UseInterceptors(ClassSerializerInterceptor)
      findAllEnabled(): Promise<UsuarioDto[]>  {
        return this.userService.findAllEnabled();
      }
    
      @UseInterceptors(ClassSerializerInterceptor)
      @Get(':id')
      findOne(@Param('id') id: string): Promise<UsuarioDto>  {
        return this.userService.findOne(id);
      }
    
      @Put()
      async update(@Body() registro: UsuarioDto): Promise<UsuarioDto>  {
        if(!registro || !registro.idUsuario) throw new InternalServerErrorException(MensajesExcepcion.NOEXISTEREGISTRO);
        const usuarioPrevio = await this.findOne(registro.idUsuario);
        registro.password = usuarioPrevio.password;
        const userDB = await this.userService.update(registro);
        delete userDB.password;
        return userDB;
      }
    
      @Post('validarDatosTelefonoCorreo')
      async validarDatosUsuario(@Body() registro: ValidarDatosDto) {
        const existe = await this.userService.buscarUsuarioTelefonoCorreo(registro.correo, registro.celular, registro.idUsuario);
        return {estado: existe.length === 0};
      }
    
      @Post('validarUsuario')
      async validarUsuario(@Body() registro: ValidarUsuarioDto) {
        const existe = await this.userService.buscarUsuarioPorNombre(registro?.usuario);
        return {estado: !existe};
      }
    
      @Post('login')
      @Public()
      async login(@Body() usuario: LoginDto): Promise<Respuesta> {
        const respuesta = new Respuesta();
        respuesta.estado = false;
        const usuarioJwt = await this.obtenerPayLoad(usuario);

        if(!usuarioJwt) return respuesta;
        respuesta.estado = true;
        respuesta.respuesta = this.userService.getJwtToken(usuarioJwt);
        return respuesta;
      }
    
      private async enviarCorreoNuevoUsuario(usuario: UsuarioDto){
        const datos = {correo: usuario.correo, usuario: usuario.usuario}; 
        await this.notificacionService.enviarCorreoBienvenida(datos);
        return;
      }

      private async obtenerPayLoad(usuario: LoginDto){
        if(!usuario) return null;
    
        const userDB = await this.userService.buscarUsuarioPorNombre(usuario.usuario);
        if(!userDB || !userDB.indicadorHabilitado) return null;
    
        const isValidPassword = this.userService.checkPassword(
          usuario.password,
          userDB.password,
        );
    
        if (!isValidPassword) return null;
        return this.userService.obtenerJwtPayload(userDB);
      }


}
