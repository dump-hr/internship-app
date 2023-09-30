import { CreateTestSlotDto } from '@internship-app/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Discipline, TestStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TestSlotService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const testSlots = await this.prisma.testSlot.findMany({
      include: {
        _count: {
          select: {
            internDisciplines: true,
            testQuestions: true,
          },
        },
      },
    });

    return testSlots;
  }

  async create(testSlotDto: CreateTestSlotDto) {
    const overlappingSlotCount = await this.prisma.testSlot.count({
      where: {
        discipline: testSlotDto.discipline,
        AND: [
          { start: { lt: testSlotDto.end } },
          { end: { gt: testSlotDto.start } },
        ],
      },
    });
    if (overlappingSlotCount)
      throw new BadRequestException('Slot se overlappa s postojećim!');

    return await this.prisma.testSlot.create({
      data: {
        capacity: testSlotDto.capacity,
        discipline: testSlotDto.discipline,
        start: testSlotDto.start,
        end: testSlotDto.end,
        location: testSlotDto.location,
      },
    });
  }

  async getAvailableSlots(internId: string, discipline: Discipline) {
    const internDiscipline = await this.prisma.internDiscipline.findUnique({
      where: {
        internId_discipline: {
          internId,
          discipline,
        },
      },
      include: {
        testSlot: true,
      },
    });

    if (!internDiscipline) {
      throw new NotFoundException('Intern with such discipline not found');
    }

    if (internDiscipline.testSlot) {
      throw new BadRequestException('Test already scheduled');
    }

    if (internDiscipline.testStatus !== TestStatus.PickTerm) {
      throw new BadRequestException('Intern has no right to schedule test');
    }

    const slots = await this.prisma.testSlot.findMany({
      where: {
        discipline,
        start: {
          gt: new Date(),
        },
      },
      include: {
        _count: {
          select: {
            internDisciplines: true,
          },
        },
      },
    });

    const availableSlots = slots.filter(
      (s) => s._count.internDisciplines < s.capacity,
    );

    return availableSlots;
  }

  async scheduleTest(slotId: string, internId: string) {
    const slot = await this.prisma.testSlot.findUnique({
      where: { id: slotId },
      include: {
        _count: {
          select: {
            internDisciplines: true,
          },
        },
      },
    });

    if (slot._count.internDisciplines > slot.capacity) {
      throw new NotFoundException('Slot is already taken');
    }

    if (new Date() > slot.start) throw new NotFoundException('Slot is over');

    const internDiscipline = await this.prisma.internDiscipline.findUnique({
      where: {
        internId_discipline: {
          internId,
          discipline: slot.discipline,
        },
      },
    });

    if (internDiscipline.testStatus !== TestStatus.PickTerm) {
      throw new NotFoundException('Intern has no right to pick this slot');
    }

    return await this.prisma.internDiscipline.update({
      where: {
        internId_discipline: {
          discipline: slot.discipline,
          internId,
        },
      },
      data: {
        testStatus: TestStatus.Pending,
        testSlot: {
          connect: {
            id: slotId,
          },
        },
      },
    });
  }
}
