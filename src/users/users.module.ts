import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from 'src/database/schemas/user.schema';
import {
  ProfileDocument,
  ProfileSchema,
} from 'src/database/schemas/profile.schema';
import { ConnectionName } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/jwtConstants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
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
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
