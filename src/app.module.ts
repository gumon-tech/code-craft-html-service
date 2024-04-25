import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file_upload/file_upload.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    FileUploadModule,
    DatabaseModule,
    UsersModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
