import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  collection: 'profile',
  timestamps: true,
})
export class ProfileDocument extends Document {
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  image: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  firstName: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  lastName: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  nickname: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  email: string;

  @Prop({
    type: Object,
    default: {},
  })
  bio: object;
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileDocument);
