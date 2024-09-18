import { TestCluster, TestClusterWithTestCases } from '@internship-app/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MemberGuard } from 'src/auth/admin.guard';

import { CreateTestClusterDto } from './dto/create-test-cluster.dto';
import { UpdateTestClusterDto } from './dto/update-test-cluster.dto';
import { TestClusterService } from './test-cluster.service';

@Controller('test-cluster')
export class TestClusterController {
  constructor(private readonly testClusterService: TestClusterService) {}

  @Post()
  create(@Body() createTestClusterDto: CreateTestClusterDto) {
    return this.testClusterService.create(createTestClusterDto);
  }

  @Get()
  @UseGuards(MemberGuard)
  async getAll() {
    const allClusters = await this.testClusterService.getAllAdmin();
    const testClustersDto = allClusters.map((tc) => ({
      ...tc,
      testCases: tc.testCase.map((testCase) => ({
        input: testCase.input,
        output: testCase.expectedOutput,
      })),
    })) satisfies TestClusterWithTestCases[];

    return testClustersDto;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testClusterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestClusterDto: UpdateTestClusterDto,
  ) {
    return this.testClusterService.update(+id, updateTestClusterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testClusterService.remove(+id);
  }
}
