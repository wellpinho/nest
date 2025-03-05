import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  // UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { isArray } from 'class-validator';
// import { InterceptorHandleDataResponse } from 'src/common/interceptors/HandleDataResponse.interceptor';
// import { InterceptorAddHeader } from 'src/common/interceptors/addHeader.interceptor';
// import { InterceptorTimeConection } from 'src/common/interceptors/TimeConection.interceptor';
// import { InterceptorSimpleCache } from 'src/common/interceptors/SimpleCache.interceptor';

@Controller('recados')
// @UseInterceptors(InterceptorSimpleCache)
// @UseInterceptors(InterceptorHandleDataResponse)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @Get()
  // @UseInterceptors(InterceptorAddHeader)
  // @UseInterceptors(InterceptorTimeConection)
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.recadosService.findAll(offset, limit);
  }

  @Get(':id')
  // @UseInterceptors(InterceptorAddHeader)
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  async create(@Body() createRecadoDto: CreateRecadoDto | CreateRecadoDto[]) {
    if (isArray(createRecadoDto)) {
      return await this.recadosService.createMany(createRecadoDto);
    }

    return await this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
