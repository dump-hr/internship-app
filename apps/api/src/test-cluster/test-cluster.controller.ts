import { TestClusterWithTestCases } from '@internship-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard, MemberGuard } from 'src/auth/admin.guard';

import { CreateTestClusterDto } from './dto/create-test-cluster.dto';
import { UpdateTestClusterDto } from './dto/update-test-cluster.dto';
import { TestClusterService } from './test-cluster.service';
import { TestClusterQuery } from './dto/test-cluster.query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('test-cluster')
@Controller('test-cluster')
export class TestClusterController {
  constructor(private readonly testClusterService: TestClusterService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createTestClusterDto: CreateTestClusterDto) {
    return await this.testClusterService.create(createTestClusterDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAllAdmin(@Query() questionId: TestClusterQuery) {
    const allClusters = await this.testClusterService.getAll(questionId);

    return allClusters;
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async getSingleAdmin(@Param('id') id: string) {
    const cluster = await this.testClusterService.getSingleAdmin(id);
    const mappedCluster = {
      ...cluster,
      testQuestionTitle: cluster.testQuestion.title,
    } satisfies TestClusterWithTestCases;

    return mappedCluster;
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTestClusterDto: UpdateTestClusterDto,
  ) {
    await this.testClusterService.update(id, updateTestClusterDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    await this.testClusterService.remove(id);
  }
}
