import { Controller, Get, NotFoundException, Param, } from '@nestjs/common';
import { InternService } from './intern.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('intern')
@ApiTags('intern')
export class InternController {
  constructor(private readonly internService: InternService) {}
  
  @Get()
  async getAll() {
    const interns = await this.internService.getAll();
    
    return interns;
  }


  @Get(':id')
  async get(@Param('id') id: string) {
    const intern = await this.internService.get(id);

    if(!intern){
      throw new NotFoundException();
    }

    return intern;
  }
}