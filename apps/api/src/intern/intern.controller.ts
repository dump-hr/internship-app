import { Body, Controller, Get, NotFoundException, Param, Post} from '@nestjs/common';
import { InternService } from './intern.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateInternDto } from './dto/createIntern.dto';

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

  @Post()
  async create(@Body() intern: CreateInternDto) {
    const newIntern = await this.internService.create(intern);

    return newIntern;
  }
}