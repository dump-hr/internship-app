import { CreateTestSlotsRequest, TestSlot } from '@internship-app/types';
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

  async get(id: string) {
    return await this.prisma.testSlot.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        testQuestions: true,
        internDisciplines: {
          include: {
            intern: true,
          },
        },
      },
    });
  }

  async create(testSlotDto: CreateTestSlotsRequest) {
    return await this.prisma.$transaction(
      testSlotDto.map((slot) =>
        this.prisma.testSlot.create({
          data: {
            capacity: slot.capacity,
            discipline: slot.discipline,
            start: slot.start,
            end: slot.end,
            location: slot.location,
          },
        }),
      ),
    );
  }

  async update(id: string, testSlot: TestSlot) {
    await this.prisma.testSlot.update({
      where: { id },
      data: {
        start: testSlot.start,
        end: testSlot.end,
        capacity: testSlot.capacity,
        location: testSlot.location,
        testQuestions: {
          deleteMany: {
            testSlotId: id,
            NOT: testSlot.testQuestions.map((tq) => ({ id: tq.id })),
          },
          upsert: testSlot.testQuestions.map((tq) => ({
            where: { id: tq.id || '' },
            create: tq,
            update: tq,
          })),
        },
      },
    });
  }

  async delete(id: string) {
    const internsOnSlotCount = await this.prisma.internDiscipline.count({
      where: { testSlotId: id },
    });

    if (internsOnSlotCount)
      throw new BadRequestException(
        'Test with linked interns cannot be removed! Try manually cancelling intern test slots.',
      );

    return await this.prisma.testSlot.delete({ where: { id } });
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
