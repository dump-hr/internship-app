import { CreateTestSlotsRequest, SubmitTestRequest, TestSlot } from '@internship-app/types';
import { Discipline } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class TestSlotService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private postmark;
    getAll(): Promise<({
        _count: {
            internDisciplines: number;
            testQuestions: number;
        };
    } & {
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
    })[]>;
    get(id: string): Promise<{
        internDisciplines: ({
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
        testQuestions: {
            id: string;
            title: string;
            text: string;
            points: number;
            order: number;
            testSlotId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    create(testSlotDto: CreateTestSlotsRequest): Promise<{
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
    }[]>;
    update(id: string, testSlot: TestSlot): Promise<void>;
    delete(id: string): Promise<{
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
    }>;
    getAvailableSlots(internId: string, discipline: Discipline): Promise<{
        password: any;
        _count: {
            internDisciplines: number;
        };
        id: string;
        discipline: import(".prisma/client").$Enums.Discipline;
        start: Date;
        end: Date;
        location: string;
        capacity: number;
        maxPoints: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    scheduleTest(slotId: string, internId: string): Promise<{
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
    chooseTest(password: string): Promise<{
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
    }>;
    startTest(testSlotId: string, email: string, password: string): Promise<{
        testQuestions: {
            id: string;
            title: string;
            text: string;
            points: number;
            order: number;
            testSlotId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    submitTest(testSlotId: string, test: SubmitTestRequest): Promise<string>;
    getTestAnswersByIntern(testSlotId: string, internId: string): Promise<({
        question: {
            id: string;
            title: string;
            text: string;
            points: number;
            order: number;
            testSlotId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        language: import(".prisma/client").$Enums.CodingLanguage;
        code: string;
        score: number;
        questionId: string;
        internDisciplineInternId: string;
        internDisciplineDiscipline: import(".prisma/client").$Enums.Discipline;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getTestAnswersByQuestion(questionId: string): Promise<({
        question: {
            id: string;
            title: string;
            text: string;
            points: number;
            order: number;
            testSlotId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        language: import(".prisma/client").$Enums.CodingLanguage;
        code: string;
        score: number;
        questionId: string;
        internDisciplineInternId: string;
        internDisciplineDiscipline: import(".prisma/client").$Enums.Discipline;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    setScore(answerId: string, score: number): Promise<{
        id: string;
        language: import(".prisma/client").$Enums.CodingLanguage;
        code: string;
        score: number;
        questionId: string;
        internDisciplineInternId: string;
        internDisciplineDiscipline: import(".prisma/client").$Enums.Discipline;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
