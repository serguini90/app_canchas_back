import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CanchaHorarioDto } from 'src/dtos/cancha-horario.dto';
import { CanchaDto } from 'src/dtos/cancha.dto';
import { CanchaHorario } from 'src/entities/cancha-horario.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CanchaHorarioService {

  constructor(@InjectRepository(CanchaHorario) 
  private readonly principalRepository: Repository<CanchaHorario>,
  @InjectDataSource() private dataSource: DataSource){
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

  findByCancha(idCancha: string) {
    return this.principalRepository.findBy({idCancha, indicadorHabilitado: true});
  }

  async findByCanchaLibre(idCancha: string, fecha: string): Promise<CanchaDto> {
    const respuesta = await this.dataSource.query(`SELECT c.IdCanchaHorario AS idCanchaHorario, c.HoraInicio AS horaInicio, c.HoraFin AS horaFin,
    CAST((IF((SELECT r.IdCanchaHorario  FROM cancha_sintetica.reservas r WHERE r.IndicadorHabilitado = 1 AND r.IdCanchaHorario=c.IdCanchaHorario AND DATE(r.Fecha) = DATE('${fecha}')) IS NOT NULL, 0,1)) as TINYINT) AS indicadorLibre
    FROM cancha_sintetica.canchashorarios c 
    WHERE c.IdCancha = '${idCancha}' AND c.IndicadorHabilitado = 1 
    ORDER BY c.HoraInicio ASC`);
    return respuesta;
  }


  update(objeto: CanchaHorarioDto) {
    return this.principalRepository.save(objeto);
  }

}