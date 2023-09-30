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
    const testSlots = await this.prisma.testSlot.findMany();
    return testSlots;
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
            InternDiscipline: true,
          },
        },
      },
    });

    const availableSlots = slots.filter(
      (s) => s._count.InternDiscipline < s.capacity,
    );

    return availableSlots;
  }

  async scheduleTest(slotId: string, internId: string) {
    const slot = await this.prisma.testSlot.findUnique({
      where: { id: slotId },
      include: {
        _count: {
          select: {
            InternDiscipline: true,
          },
        },
      },
    });

    if (slot._count.InternDiscipline > slot.capacity) {
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
