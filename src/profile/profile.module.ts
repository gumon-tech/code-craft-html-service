import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionName } from 'src/database/database.module';
import { UserDocument, UserSchema } from 'src/database/schemas/user.schema';
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
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
