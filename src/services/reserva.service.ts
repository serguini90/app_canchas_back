import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tabla } from 'src/commons/tablas';
import { CanchaDto } from 'src/dtos/cancha.dto';
import { ReservaDto } from 'src/dtos/reserva.dto';
import { CanchaHorario } from 'src/entities/cancha-horario.entity';
import { Cancha } from 'src/entities/cancha.entity';
import { ListaMedioPago } from 'src/entities/lista-medio-pago.entity';
import { Reserva } from 'src/entities/reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {

  constructor(@InjectRepository(Reserva) 
  private readonly principalRepository: Repository<Reserva>){
  }

  create(objeto: ReservaDto) {
    delete objeto.idReserva;
    return this.principalRepository.save(objeto);
  }

  findAll() {
    return this.principalRepository.find();
  }

  findAllEnabled() {
    return this.principalRepository.findBy({indicadorHabilitado: true});
  }

  findOne(id: string) {
    return this.principalRepository.findOneBy({idReserva: id});
  }

  findMisReservas(id: string) {
    return this.principalRepository.createQueryBuilder(Tabla.RESERVAS)
      .leftJoinAndMapOne(`${Tabla.RESERVAS}.${Tabla.LISTASMEDIOSPAGOS}`, ListaMedioPago, 'l1', `l1.IdLista=${Tabla.RESERVAS}.IdMedioPago`)
      .leftJoinAndMapOne(`${Tabla.RESERVAS}.${Tabla.CANCHASHORARIOS}`, CanchaHorario, 'ch', `ch.IdCanchaHorario=${Tabla.RESERVAS}.IdCanchaHorario`)
      .leftJoinAndMapOne(`ch.${Tabla.CANCHAS}`, Cancha, 'c', `c.IdCancha=ch.IdCancha`)
      .where(`${Tabla.RESERVAS}.idUsuario = :idUsuario`, { idUsuario: id})
      .andWhere(`DATE(${Tabla.RESERVAS}.fecha) >= DATE(NOW())`)
      .andWhere(`${Tabla.RESERVAS}.indicadorHabilitado=1`)
      .orderBy(`${Tabla.RESERVAS}.fecha`,'ASC')
      .getMany();
  }


  update(objeto: ReservaDto) {
    return this.principalRepository.save(objeto);
  }

}