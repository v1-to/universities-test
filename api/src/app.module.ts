import { Module } from '@nestjs/common';
import { UniversityModule } from './university/university.module';

@Module({ imports: [UniversityModule] })
export class AppModule {}
