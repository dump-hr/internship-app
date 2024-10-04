import { Discipline } from '@prisma/client';
export declare class CreateInterviewerDto {
    name: string;
    disciplines: Discipline[];
    email: string;
}
