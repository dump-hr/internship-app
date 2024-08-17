import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { CreateClusterDto } from './dto/create-cluster.dto';
import { UpdateClusterDto } from './dto/update-cluster.dto';

@Controller('cluster')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Post()
  create(@Body() createClusterDto: CreateClusterDto) {
    return this.clusterService.create(createClusterDto);
  }

  @Get()
  findAll() {
    return this.clusterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clusterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClusterDto: UpdateClusterDto) {
    return this.clusterService.update(+id, updateClusterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clusterService.remove(+id);
  }
}
