import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'user',
  timestamps: true,
})
export class UserDocument extends Document {
  _id: string;

  @Prop({
    index: 1,
    type: String,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
