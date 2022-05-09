/* eslint-disable @typescript-eslint/lines-between-class-members */
import mongoose, { Document, model } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User";

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class UserAction {
  _id?: string;

  @Prop({ required: true, enum: ["like", "pass"] })
  type!: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userFromId!: string;
  userFrom?: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userToId!: string;
  userTo?: User;

  @Prop({ required: true, default: false })
  deleted?: boolean;

  @Prop({ required: true })
  createDate!: Date;

  @Prop({ required: true })
  editDate!: Date;
}

export type UserActionDocument = UserAction & Document;
export const UserActionSchema = SchemaFactory.createForClass(UserAction);

UserActionSchema.index({
  userFromId: 1,
  userToId: 1,
});

UserActionSchema.index({
  userToId: 1,
  userFromId: 1,
});

UserActionSchema.virtual("userFrom", {
  ref: "User",
  localField: "userFromId",
  foreignField: "_id",
  justOne: true,
});

UserActionSchema.virtual("userTo", {
  ref: "User",
  localField: "userToId",
  foreignField: "_id",
  justOne: true,
});

export const UserActionModel = model<UserActionDocument>(UserAction.name, UserActionSchema);
