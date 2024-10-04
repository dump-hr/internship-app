import { Discipline, Prisma } from '@prisma/client';
export declare class CreateInternDto {
    firstName: string;
    lastName: string;
    email: string;
    disciplines: Discipline[];
    data: Prisma.JsonObject;
}
