import { Discipline, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';
export declare class InterviewSlotService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private postmark;
    getAll(): Promise<({
        intern: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            image: string;
            data: Prisma.JsonValue;
            notes: string;
            interviewStatus: import(".prisma/client").$Enums.InterviewStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        interviewers: ({
            interviewSlot: {
                id: string;
                internId: string;
                start: Date;
                end: Date;
                answers: Prisma.JsonValue;
                score: number;
                createdAt: Date;
                updatedAt: Date;
            };
            interviewer: {
                id: string;
                name: string;
                disciplines: import(".prisma/client").$Enums.Discipline[];
                email: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            interviewSlotId: string;
            interviewerId: string;
        })[];
    } & {
        id: string;
        internId: string;
        start: Date;
        end: Date;
        answers: Prisma.JsonValue;
        score: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    deleteInterviewSlot(id: string): Promise<{
        id: string;
        internId: string;
        start: Date;
        end: Date;
        answers: Prisma.JsonValue;
        score: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createInterviewSlot(interviewSlotDto: CreateInterviewSlotDto): Promise<any[]>;
    getAvailableSlots(internId: string): Promise<{
        id: string;
        internId: string;
        start: Date;
        end: Date;
        answers: Prisma.JsonValue;
        score: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getAvailableSlotsByDisciplines(): Promise<{
        available: number;
        disciplines: Discipline[];
        needed: number;
    }[]>;
    scheduleInterview(slotId: string, internId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        data: Prisma.JsonValue;
        notes: string;
        interviewStatus: import(".prisma/client").$Enums.InterviewStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
