import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservaDto } from 'src/dtos/reserva.dto';
import { ReservaService } from 'src/services/reserva.service';

@Controller('reserva')
@ApiTags('reserva')
@ApiBearerAuth()
export class ReservaController {

  constructor(private readonly principalService: ReservaService) {}

  @Post()
  create(@Body() registro: ReservaDto) {
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
  update(@Body() registro: ReservaDto) {
    return this.principalService.update(registro);
  }
}

