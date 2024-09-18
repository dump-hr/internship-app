import { Module } from '@nestjs/common';
import { TestClusterService } from './test-cluster.service';
import { TestClusterController } from './test-cluster.controller';

@Module({
  controllers: [TestClusterController],
  providers: [TestClusterService]
})
export class TestClusterModule {}
