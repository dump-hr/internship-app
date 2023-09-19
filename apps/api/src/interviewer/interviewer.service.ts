import { Injectable } from '@nestjs/common';

@Injectable()
export class InterviewerService {
  async findAll() {
    return await this.prisma.interviewer.findMany();
  }
}
