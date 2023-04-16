import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CanchaDto } from 'src/dtos/cancha.dto';
import { CanchaService } from 'src/services/cancha.service';


@Controller('cancha')
@ApiTags('cancha')
@ApiBearerAuth()
export class CanchaController {

  constructor(private readonly principalService: CanchaService) {}

  @Post()
  create(@Body() registro: CanchaDto) {
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
  update(@Body() registro: CanchaDto) {
    return this.principalService.update(registro);
  }
}
