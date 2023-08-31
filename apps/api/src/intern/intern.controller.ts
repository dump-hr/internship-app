import { Controller, Get, NotFoundException, Param, } from '@nestjs/common';
import { InternService } from './intern.service';

@Controller('intern')
export class InternController {
  constructor(private readonly internService: InternService) {}
  
  @Get(':id')
  async get(@Param('id') id: string) {
    const intern = await this.internService.get(id);

    if(!intern){
      throw new NotFoundException();
    }

    return intern;
  }
}
