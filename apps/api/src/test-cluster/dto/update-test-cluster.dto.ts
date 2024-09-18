import { PartialType } from '@nestjs/swagger';

import { CreateTestClusterDto } from './create-test-cluster.dto';

export class UpdateTestClusterDto extends PartialType(CreateTestClusterDto) {}
