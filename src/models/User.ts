import { Document, model } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  _id?: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  birthDate!: Date;

  @Prop({ required: true })
  avatar!: string;

  @Prop({ required: true, default: false })
  deleted?: boolean;

  @Prop({ required: true })
  createDate!: Date;

  @Prop({ required: true })
  editDate!: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = model<UserDocument>(User.name, UserSchema);
