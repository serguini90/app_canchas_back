import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CanchaHorarioDto } from 'src/dtos/cancha-horario.dto';
import { CanchaHorario } from 'src/entities/cancha-horario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CanchaHorarioService {

  constructor(@InjectRepository(CanchaHorario) 
  private readonly principalRepository: Repository<CanchaHorario>){
  }

  create(objeto: CanchaHorarioDto) {
    delete objeto.idCanchaHorario;
    return this.principalRepository.save(objeto);
  }

  findAll() {
    return this.principalRepository.find();
  }

  findAllEnabled() {
    return this.principalRepository.findBy({indicadorHabilitado: true});
  }

  findOne(id: string) {
    return this.principalRepository.findOneBy({idCanchaHorario: id});
  }

  update(objeto: CanchaHorarioDto) {
    return this.principalRepository.save(objeto);
  }

}