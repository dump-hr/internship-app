/// <reference types="node" />
import { BoardAction, CreateNoteRequest, InternAction, InternDecisionRequest, SetInterviewRequest } from '@internship-app/types';
import { PrismaService } from 'src/prisma.service';
import { CreateInternDto } from './dto/createIntern.dto';
export declare class InternService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private s3;
    private postmark;
    get(id: string): Promise<{
        internDisciplines: ({
            testSlot: {
                id: string;
                discipline: import(".prisma/client").$Enums.Discipline;
                start: Date;
                end: Date;
                location: string;
                capacity: number;
                maxPoints: number;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            internId: string;
            discipline: import(".prisma/client").$Enums.Discipline;
            priority: number;
            status: import(".prisma/client").$Enums.DisciplineStatus;
            testSlotId: string;
            testStatus: import(".prisma/client").$Enums.TestStatus;
            testScore: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        interviewSlot: {
            interviewers: ({
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
        };
        logs: {
            id: string;
            internId: string;
            action: import(".prisma/client").$Enums.InternLogAction;
            date: Date;
        }[];
    } & {
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
    getAll(): Promise<({
        internDisciplines: {
            internId: string;
            discipline: import(".prisma/client").$Enums.Discipline;
            priority: number;
            status: import(".prisma/client").$Enums.DisciplineStatus;
            testSlotId: string;
            testStatus: import(".prisma/client").$Enums.TestStatus;
            testScore: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        interviewSlot: {
            score: number;
        };
        _count: {
            logs: number;
        };
    } & {
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
    })[]>;
    getApplicationStatus(id: string): Promise<{
        internDisciplines: {
            discipline: import(".prisma/client").$Enums.Discipline;
            testScore: number;
            testStatus: import(".prisma/client").$Enums.TestStatus;
            testSlot: {
                start: Date;
                end: Date;
            };
            status: import(".prisma/client").$Enums.DisciplineStatus;
            internQuestionAnswers: {
                score: number;
                question: {
                    points: number;
                };
            }[];
        }[];
        interviewSlot: {
            start: Date;
            end: Date;
        };
        email: string;
        firstName: string;
        lastName: string;
        interviewStatus: import(".prisma/client").$Enums.InterviewStatus;
    }>;
    create(internToCreate: CreateInternDto): Promise<{
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
    setInterview(internId: string, data: SetInterviewRequest): Promise<void>;
    setImage(internId: string, buffer: Buffer): Promise<string>;
    applyAction(internId: string, action: InternAction): Promise<{
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
    } | {
        internId: string;
        discipline: import(".prisma/client").$Enums.Discipline;
        priority: number;
        status: import(".prisma/client").$Enums.DisciplineStatus;
        testSlotId: string;
        testStatus: import(".prisma/client").$Enums.TestStatus;
        testScore: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    applyBoardAction(action: BoardAction, internIds: string[]): Promise<import(".prisma/client").Prisma.BatchPayload | {
        internId: string;
        discipline: import(".prisma/client").$Enums.Discipline;
        priority: number;
        status: import(".prisma/client").$Enums.DisciplineStatus;
        testSlotId: string;
        testStatus: import(".prisma/client").$Enums.TestStatus;
        testScore: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    setDecision(internId: string, data: InternDecisionRequest): Promise<{
        internId: string;
        discipline: import(".prisma/client").$Enums.Discipline;
        priority: number;
        status: import(".prisma/client").$Enums.DisciplineStatus;
        testSlotId: string;
        testStatus: import(".prisma/client").$Enums.TestStatus;
        testScore: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createNote(internId: string, data: CreateNoteRequest): Promise<{
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
    count(): Promise<number>;
    private getInitialTestStatus;
}
