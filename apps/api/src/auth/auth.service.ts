import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async adminPasswordLogin(email: string, password: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const admin = await this.prismaService.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
