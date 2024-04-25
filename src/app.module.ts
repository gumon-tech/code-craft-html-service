import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file_upload/file_upload.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    FileUploadModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
