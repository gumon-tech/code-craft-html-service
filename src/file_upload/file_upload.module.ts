import { Module } from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { FileUploadController } from './file_upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from 'src/database/schemas/user.schema';
import { ConnectionName } from 'src/database/database.module';
import {
  ProfileDocument,
  ProfileSchema,
} from 'src/database/schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: UserDocument.name,
          schema: UserSchema,
        },
        {
          name: ProfileDocument.name,
          schema: ProfileSchema,
        },
      ],
      ConnectionName.database,
    ),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
