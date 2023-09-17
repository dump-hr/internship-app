import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';
import { InternDisciplineController } from './intern-discipline/intern-discipline.controller';
import { InternDisciplineModule } from './intern-discipline/intern-discipline.module';
import { InterviewSlotController } from './interview-slot/interview-slot.controller';
import { InterviewSlotModule } from './interview-slot/interview-slot.module';
import { InterviewSlotService } from './interview-slot/interview-slot.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'dist'),
      exclude: ['/api/(.*)'],
    }),
    InternModule,
    InterviewSlotModule,
    InternDisciplineModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
