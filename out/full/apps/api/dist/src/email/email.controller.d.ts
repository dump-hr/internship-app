import { LoggerService } from 'src/logger/logger.service';
import { EmailsDto } from './dto/emails.dto';
import { EmailsSendDto } from './dto/emailsSend.dto';
import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    private readonly loggerService;
    constructor(emailService: EmailService, loggerService: LoggerService);
    sendEmails({ emails, text, subject }: EmailsSendDto): Promise<import("postmark/dist/client/models").MessageSendingResponse[]>;
    makeEmails({ emails, text }: EmailsDto): Promise<string[]>;
}
