import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UniversityModule } from '@university/university.module';
import { TasksModule } from '@tasks/tasks.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI, {
      dbName: process.env.MONGODB_DATABASE,
    }),
    AuthModule,
    UniversityModule,
    TasksModule,
    UserModule,
  ],
})
export class AppModule {}
