import { Types } from "mongoose";
import { User, UserModel } from "../models/User";
import { ValidationError, NotFoundError } from "../core/errors";
import { CreateUserActionType, UserLikeReturn } from "../types/users";
import { UserAction, UserActionModel } from "../models/UserAction";

class UserService {
  private validate(action: CreateUserActionType | UserAction) {
    if (action.userFromId == null) {
      throw new ValidationError("userFromId is required");
    }

    if (action.userToId == null) {
      throw new ValidationError("userToId is required");
    }
  }

  async likeUser(action: CreateUserActionType): Promise<UserLikeReturn> {
    this.validate(action);

    // check existed userFromId
    const foundUserFrom = await UserModel.findOne({
      _id: action.userFromId,
    })
      .lean()
      .exec();

    if (foundUserFrom == null) {
      throw new NotFoundError(`User ${action.userFromId} not existed`);
    }

    // check existed userToId
    const foundUserTo = await UserModel.findOne({
      _id: action.userToId,
    })
      .lean()
      .exec();

    if (foundUserTo == null) {
      throw new NotFoundError(`User ${action.userToId} not existed`);
    }

    // save
    await UserActionModel.create({
      ...action,
      type: "like",
      _id: Types.ObjectId(),
      createDate: new Date(),
      editDate: new Date(),
    });

    // check user is a match
    const userMatch = await UserActionModel.findOne({
      type: "like",
      userFromId: action.userToId,
      userToId: action.userFromId,
      deleted: false,
    })
      .lean()
      .exec();

    return {
      matched: userMatch != null,
    };
  }

  async passUser(action: CreateUserActionType): Promise<boolean> {
    this.validate(action);

    // check existed userFromId
    const foundUserFrom = await UserModel.findOne({
      _id: action.userFromId,
    })
      .lean()
      .exec();

    if (foundUserFrom == null) {
      throw new NotFoundError(`User ${action.userFromId} not existed`);
    }

    // check existed userToId
    const foundUserTo = await UserModel.findOne({
      _id: action.userToId,
    })
      .lean()
      .exec();

    if (foundUserTo == null) {
      throw new NotFoundError(`User ${action.userToId} not existed`);
    }

    // save
    await UserActionModel.create({
      ...action,
      type: "pass",
      _id: Types.ObjectId(),
      createDate: new Date(),
      editDate: new Date(),
    });

    return true;
  }

  async getUserActions(userId: string): Promise<UserAction[]> {
    const userActions = await UserActionModel.find({
      userFromId: userId,
      deleted: false,
    })
      .populate("userTo")
      .lean()
      .exec();

    return userActions;
  }

  async getUserLikes(userId: string): Promise<User[]> {
    const userActions = await UserActionModel.find({
      type: "like",
      userFromId: userId,
      deleted: false,
    })
      .populate("userTo")
      .lean()
      .exec();

    return userActions.map((action) => action.userTo!);
  }

  async getUserMatches(userId: string): Promise<User[]> {
    // get all liked users
    const userLikes = await UserActionModel.find({
      type: "like",
      userFromId: userId,
      deleted: false,
    })
      .lean()
      .exec();

    if (userLikes.length === 0) {
      return [];
    }

    const userLikeIds = userLikes.map((like) => like.userToId);

    // find matches from liked users
    const userMatches = await UserActionModel.find({
      type: "like",
      userToId: userId,
      userFromId: { $in: userLikeIds },
      deleted: false,
    })
      .populate("userFrom")
      .lean()
      .exec();

    return userMatches.map((action) => action.userFrom!);
  }
}

export default new UserService();
