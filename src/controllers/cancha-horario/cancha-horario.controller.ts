import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CanchaHorarioDto } from 'src/dtos/cancha-horario.dto';
import { CanchaHorarioService } from 'src/services/cancha-horario.service';

@Controller('cancha-horario')
@ApiTags('cancha-horario')
@ApiBearerAuth()
export class CanchaHorarioController {

  constructor(private readonly principalService: CanchaHorarioService) {}

  @Post()
  create(@Body() registro: CanchaHorarioDto) {
    return this.principalService.create(registro);
  }

  @Get()
  findAll() {
    return this.principalService.findAll();
  }

  @Get('enabled')
  findAllEnabled() {
    return this.principalService.findAllEnabled();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.principalService.findOne(id);
  }

  @Put()
  update(@Body() registro: CanchaHorarioDto) {
    return this.principalService.update(registro);
  }
}
