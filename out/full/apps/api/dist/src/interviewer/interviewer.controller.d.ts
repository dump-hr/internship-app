import { LoggerService } from 'src/logger/logger.service';
import { CreateInterviewerDto } from './dto/createInterviewer.dto';
import { InterviewerService } from './interviewer.service';
export declare class InterviewerController {
    private readonly interviewerService;
    private readonly loggerService;
    constructor(interviewerService: InterviewerService, loggerService: LoggerService);
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
    create(interviewer: CreateInterviewerDto): Promise<{
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
