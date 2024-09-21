import { Module } from '@nestjs/common';
import { TestClusterService } from './test-cluster.service';
import { TestClusterController } from './test-cluster.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TestClusterController],
  providers: [TestClusterService, PrismaService],
})
export class TestClusterModule {}
