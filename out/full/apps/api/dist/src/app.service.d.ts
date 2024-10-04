import { PrismaService } from './prisma.service';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    healthCheck(): Promise<string>;
}
