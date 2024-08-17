import { PartialType } from '@nestjs/swagger';
import { CreateClusterDto } from './create-cluster.dto';

export class UpdateClusterDto extends PartialType(CreateClusterDto) {}
