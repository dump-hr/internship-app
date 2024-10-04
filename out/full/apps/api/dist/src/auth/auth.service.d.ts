import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
    adminPasswordLogin(email: string, password: string): Promise<void>;
}
