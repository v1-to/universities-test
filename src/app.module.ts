import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityModule } from '@university/university.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI, {
      dbName: process.env.MONGODB_DATABASE,
    }),
    UniversityModule,
  ],
})
export class AppModule {}
