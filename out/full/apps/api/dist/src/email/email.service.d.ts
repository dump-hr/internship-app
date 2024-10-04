import * as postmark from 'postmark';
import { PrismaService } from 'src/prisma.service';
export declare class EmailService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private postmark;
    sendEmail(emails: string[], text: string, subject: string): Promise<postmark.Models.MessageSendingResponse[]>;
    makeEmail(emails: string[], text: string): Promise<string[]>;
}
