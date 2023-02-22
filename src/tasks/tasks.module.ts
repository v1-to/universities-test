import { Module } from '@nestjs/common';
import { UniversityModule } from '@university/university.module';
import { ThirdPartyImportService } from './third-party-import.task';

@Module({
  imports: [UniversityModule],
  providers: [ThirdPartyImportService],
})
export class TasksModule {}
