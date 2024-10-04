import { ChooseTestRequest, CreateTestSlotsRequest, ScheduleTestRequest, SetScoreRequest, StartTestRequest, SubmitTestRequest, TestSlotPreviewDto, UpdateTestSlotRequest } from '@internship-app/types';
import { Discipline } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { TestSlotService } from './test-slot.service';
export declare class TestSlotController {
    private readonly testSlotService;
    private readonly loggerService;
    constructor(testSlotService: TestSlotService, loggerService: LoggerService);
    getAll(): Promise<TestSlotPreviewDto[]>;
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
    createTestSlot(testSlotDto: CreateTestSlotsRequest): Promise<{
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
    updateTestSlot(testSlotId: string, { data }: UpdateTestSlotRequest): Promise<void>;
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
    scheduleTest(slotId: string, { internId }: ScheduleTestRequest): Promise<{
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
    chooseTest({ password }: ChooseTestRequest): Promise<{
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
    startTest(testSlotId: string, { internEmail, password }: StartTestRequest): Promise<{
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
    submitTest(testSlotId: string, req: SubmitTestRequest): Promise<string>;
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
    setScore(answerId: string, { score }: SetScoreRequest): Promise<{
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
