import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateTestClusterDto } from './dto/create-test-cluster.dto';
import { UpdateTestClusterDto } from './dto/update-test-cluster.dto';
import { TestCase } from '@prisma/client';
import { TestClusterQuery } from './dto/test-cluster.query.dto';

@Injectable()
export class TestClusterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestClusterDto: CreateTestClusterDto) {
    const action = await this.prisma.testCaseCluster.create({
      data: {
        ...createTestClusterDto,
        testCases: {
          createMany: { data: createTestClusterDto.testCases },
        },
      },
    });

    return { id: action.id };
  }

  async getSingleAdmin(id: string) {
    const testClusters = await this.prisma.testCaseCluster.findUnique({
      where: {
        id: id,
      },
      include: {
        testCases: {
          select: {
            input: true,
            expectedOutput: true,
          },
        },
        testQuestion: {
          select: {
            title: true,
          },
        },
      },
    });

    return testClusters;
  }

  async getAll(query: TestClusterQuery) {
    return await this.prisma.testCaseCluster.findMany({
      where: {
        ...(query.testQuestionId && { testQuestionId: query.testQuestionId }),
      },
      include: {
        testQuestion: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} testCluster`;
  }

  async update(id: string, updateTestClusterDto: UpdateTestClusterDto) {
    await this.prisma.testCaseCluster.update({
      where: {
        id: id,
      },
      data: {
        ...updateTestClusterDto,
        testCases: {
          deleteMany: {},
          createMany: { data: updateTestClusterDto.testCases },
        },
      },
    });
  }

  async remove(id: string) {
    await this.prisma.testCaseCluster.delete({
      where: {
        id,
      },
    });
  }
}
