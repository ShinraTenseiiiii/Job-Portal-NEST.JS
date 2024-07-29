import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Job } from 'src/jobs/schemas/jobs.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true, unique: true })
  email: string;
  
  @Prop({ required: true, length: 8, select: true }) 
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: () => Job }] })
  appliedJobs: Job[];
}

export const UserSchema = SchemaFactory.createForClass(User);