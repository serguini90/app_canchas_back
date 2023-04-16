import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuarioDto } from 'src/dtos/usuario.dto';
import { Tabla } from 'src/commons/tablas';
import { JwtPayload } from 'src/models/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuarioService {

  constructor(@InjectRepository(Usuario)
  private readonly principalRepository: Repository<Usuario>,
  private readonly jwtService: JwtService) {
  }

  create(usuario: UsuarioDto) {
    delete usuario.idUsuario;
    return this.principalRepository.save(usuario);
  }

  findAll() {
    return this.principalRepository.find();
  }

  findAllEnabled() {
    return this.principalRepository.findBy({indicadorHabilitado: true});
  }

  findOne(id: string) {
    return this.principalRepository.findOneBy({idUsuario: id});
  }

  update(objeto: UsuarioDto) {
    return this.principalRepository.save(objeto);
  }

  buscarUsuarioPorNombre(usuario: string): Promise<UsuarioDto> {
    return this.principalRepository.findOneBy({usuario: usuario});
  }

  buscarUsuarioTelefonoCorreo(correo:string, celular: string, idUsuario: string): Promise<UsuarioDto[]> {
    let query = this.principalRepository
      .createQueryBuilder(Tabla.USUARIOS)
      .where(`(${Tabla.USUARIOS}.correo = :correo OR ${Tabla.USUARIOS}.celular = :celular)`, { correo, celular });

    if (idUsuario) {
      query = query.andWhere(`${Tabla.USUARIOS}.idUsuario <> :idUsuario`, { idUsuario })
    }
    return query.getMany();
  }

  checkPassword(password: string, passwordDB: string): boolean {
    return bcrypt.compareSync(password, passwordDB);
  }

  async obtenerPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  obtenerJwtPayload(usuario: UsuarioDto): JwtPayload {
    const nuevoPayload = new JwtPayload();
    nuevoPayload.idUsuario = usuario.idUsuario;
    nuevoPayload.usuario = usuario.usuario;
    return nuevoPayload;
  }

  getJwtToken( payload: JwtPayload ): string {
    const token = this.jwtService.sign({usuario: payload});
    return token;
  }


}
