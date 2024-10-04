import { GetAdminLogsRequest } from '@internship-app/types';
import { LoggerService } from './logger.service';
export declare class LoggerController {
    private readonly loggerService;
    constructor(loggerService: LoggerService);
    getAdminLogs(req: GetAdminLogsRequest): Promise<{
        count: number;
        logs: {
            id: string;
            action: import(".prisma/client").$Enums.AdminLogAction;
            description: string;
            date: Date;
        }[];
    }>;
}
