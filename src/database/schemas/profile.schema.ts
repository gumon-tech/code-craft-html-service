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
  tittle: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  aboutMe: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  profileImageURL: string;
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileDocument);
