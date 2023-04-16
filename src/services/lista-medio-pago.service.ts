import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaMedioPagoDto } from 'src/dtos/lista-medio-pago.dto';
import { ListaMedioPago } from 'src/entities/lista-medio-pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListaMedioPagoService {

  constructor(@InjectRepository(ListaMedioPago) 
  private readonly principalRepository: Repository<ListaMedioPago>){
  }

  create(objeto: ListaMedioPagoDto) {
    delete objeto.idLista;
    return this.principalRepository.save(objeto);
  }

  findAll() {
    return this.principalRepository.find();
  }

  findAllEnabled() {
    return this.principalRepository.findBy({indicadorHabilitado: true});
  }

  findOne(id: string) {
    return this.principalRepository.findOneBy({idLista: id});
  }

  update(objeto: ListaMedioPagoDto) {
    return this.principalRepository.save(objeto);
  }

}