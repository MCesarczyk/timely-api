import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from 'src/health/health.module';
import { PrismaService } from 'src/prisma.service';
import { PeriodModule } from 'src/period/period.module';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [HealthModule, PeriodModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
