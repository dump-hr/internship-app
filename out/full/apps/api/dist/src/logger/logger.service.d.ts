import { GetAdminLogsRequest } from '@internship-app/types';
import { AdminLogAction, InternLogAction } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class LoggerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAdminLogs(req: GetAdminLogsRequest): Promise<{
        count: number;
        logs: {
            id: string;
            action: import(".prisma/client").$Enums.AdminLogAction;
            description: string;
            date: Date;
        }[];
    }>;
    createInternLog(internId: string, action: InternLogAction): Promise<{
        id: string;
        internId: string;
        action: import(".prisma/client").$Enums.InternLogAction;
        date: Date;
    }>;
    createAdminLog(action: AdminLogAction, description: string): Promise<{
        id: string;
        action: import(".prisma/client").$Enums.AdminLogAction;
        description: string;
        date: Date;
    }>;
}
