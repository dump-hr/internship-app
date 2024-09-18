import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateTestClusterDto } from './dto/create-test-cluster.dto';
import { UpdateTestClusterDto } from './dto/update-test-cluster.dto';

@Injectable()
export class TestClusterService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestClusterDto: CreateTestClusterDto) {
    return 'This action adds a new testCluster';
  }

  async getAllAdmin() {
    const testClusters = await this.prisma.testCaseCluster.findMany({
      include: {
        testCase: {
          select: {
            input: true,
            expectedOutput: true,
          },
        },
      },
    });

    return testClusters;
  }

  findOne(id: number) {
    return `This action returns a #${id} testCluster`;
  }

  update(id: number, updateTestClusterDto: UpdateTestClusterDto) {
    return `This action updates a #${id} testCluster`;
  }

  remove(id: number) {
    return `This action removes a #${id} testCluster`;
  }
}
