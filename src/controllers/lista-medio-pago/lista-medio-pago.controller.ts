import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListaMedioPagoDto } from 'src/dtos/lista-medio-pago.dto';
import { ListaMedioPagoService } from 'src/services/lista-medio-pago.service';

@Controller('lista-medio-pago')
@ApiTags('lista-medio-pago')
@ApiBearerAuth()
export class ListaMedioPagoController {

  constructor(private readonly principalService: ListaMedioPagoService) {}

  @Post()
  create(@Body() registro: ListaMedioPagoDto) {
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
  update(@Body() registro: ListaMedioPagoDto) {
    return this.principalService.update(registro);
  }
}
