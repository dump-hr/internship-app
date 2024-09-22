import { TestCluster, TestClusterWithTestCases } from '@internship-app/types';
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

import {
  CreateTestClusterDto,
  TestClusterQuery,
  UpdateTestClusterDto,
} from './dto/testCluster.dto.';
import { TestClusterService } from './test-cluster.service';
import { ApiTags } from '@nestjs/swagger';
import { MemberGuard } from 'src/auth/admin.guard';

@ApiTags('test-cluster')
@Controller('test-cluster')
export class TestClusterController {
  constructor(private readonly testClusterService: TestClusterService) {}

  @Post()
  @UseGuards(MemberGuard)
  async create(@Body() createTestClusterDto: CreateTestClusterDto) {
    return await this.testClusterService.create(createTestClusterDto);
  }

  @Get()
  @UseGuards(MemberGuard)
  async getAllAdmin(@Query() questionId: TestClusterQuery) {
    const allClusters = await this.testClusterService.getAll(questionId);
    const mapped = allClusters.map(
      (cluster) =>
        ({
          ...cluster,
          testQuestionTitle: cluster.testQuestion.title,
          testQuestion: undefined,
        } as TestCluster),
    );
    return mapped;
  }

  @Get(':id')
  @UseGuards(MemberGuard)
  async getSingleAdmin(@Param('id') id: string) {
    const cluster = await this.testClusterService.getSingleAdmin(id);
    const mappedCluster = {
      ...cluster,
      testQuestionTitle: cluster.testQuestion.title,
    } satisfies TestClusterWithTestCases;

    return mappedCluster;
  }

  @Patch(':id')
  @UseGuards(MemberGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTestClusterDto: UpdateTestClusterDto,
  ) {
    await this.testClusterService.update(id, updateTestClusterDto);
  }

  @Delete(':id')
  @UseGuards(MemberGuard)
  async remove(@Param('id') id: string) {
    await this.testClusterService.remove(id);
  }
}
