import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from 'src/entities/cancha.entity';
import { CanchaDto } from 'src/dtos/cancha.dto';

@Injectable()
export class CanchaService {

  constructor(@InjectRepository(Cancha) 
  private readonly principalRepository: Repository<Cancha>){
  }

  create(objeto: CanchaDto) {
    delete objeto.idCancha;
    return this.principalRepository.save(objeto);
  }

  findAll() {
    return this.principalRepository.find();
  }

  findAllEnabled() {
    return this.principalRepository.findBy({indicadorHabilitado: true});
  }

  findOne(id: string) {
    return this.principalRepository.findOneBy({idCancha: id});
  }

  findByUsuario(idUsuario: string) {
    return this.principalRepository.findBy({indicadorHabilitado: true, idUsuario});
  }

  update(objeto: CanchaDto) {
    return this.principalRepository.save(objeto);
  }

}