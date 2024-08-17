import { Module } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ClusterController } from './cluster.controller';

@Module({
  controllers: [ClusterController],
  providers: [ClusterService]
})
export class ClusterModule {}
