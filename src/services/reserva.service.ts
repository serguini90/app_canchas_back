import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaDto } from 'src/dtos/reserva.dto';
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

  update(objeto: ReservaDto) {
    return this.principalRepository.save(objeto);
  }

}