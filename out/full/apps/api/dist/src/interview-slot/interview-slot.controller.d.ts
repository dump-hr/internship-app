import { ScheduleInterviewRequest } from '@internship-app/types';
import { LoggerService } from 'src/logger/logger.service';
import { CreateInterviewSlotDto } from './dto/createInterviewSlot.dto';
import { InterviewSlotService } from './interview-slot.service';
export declare class InterviewSlotController {
    private readonly interviewSlotService;
    private readonly loggerService;
    constructor(interviewSlotService: InterviewSlotService, loggerService: LoggerService);
    getAll(): Promise<({
        intern: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            image: string;
            data: import(".prisma/client").Prisma.JsonValue;
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
                answers: import(".prisma/client").Prisma.JsonValue;
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
        answers: import(".prisma/client").Prisma.JsonValue;
        score: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    deleteInterviewSlot(id: string): Promise<{
        id: string;
        internId: string;
        start: Date;
        end: Date;
        answers: import(".prisma/client").Prisma.JsonValue;
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
        answers: import(".prisma/client").Prisma.JsonValue;
        score: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getAvailableSlotsByDisciplines(): Promise<{
        available: number;
        disciplines: import(".prisma/client").$Enums.Discipline[];
        needed: number;
    }[]>;
    scheduleInterview(slotId: string, { internId }: ScheduleInterviewRequest): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        data: import(".prisma/client").Prisma.JsonValue;
        notes: string;
        interviewStatus: import(".prisma/client").$Enums.InterviewStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
