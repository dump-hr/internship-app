import { PrismaService } from 'src/prisma.service';
import { CreateInterviewerDto } from './dto/createInterviewer.dto';
export declare class InterviewerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        interviews: any;
        _count: {
            interviews: number;
        };
        _avg: {
            score: number;
        };
        id: string;
        name: string;
        disciplines: import(".prisma/client").$Enums.Discipline[];
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(interviewerToCreate: CreateInterviewerDto): Promise<{
        id: string;
        name: string;
        disciplines: import(".prisma/client").$Enums.Discipline[];
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        disciplines: import(".prisma/client").$Enums.Discipline[];
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getInterviewersParticipations(): Promise<{
        interviewSlotId: string;
        interviewerId: string;
    }[]>;
}
