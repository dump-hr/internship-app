import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';
import { PrismaService } from './prisma.service';
import { InterviewSlotController } from './interview-slot/interview-slot.controller';
import { InterviewSlotService } from './interview-slot/interview-slot.service';
import { InterviewSlotModule } from './interview-slot/interview-slot.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'dist'),
      exclude: ['/api/(.*)'],
    }),
    InternModule,
    InterviewSlotModule,
  ],
  controllers: [AppController, InterviewSlotController],
  providers: [AppService, PrismaService, InterviewSlotService],
})
export class AppModule {}
