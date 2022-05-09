import { Types } from "mongoose";
import { User, UserModel } from "../models/User";
import { ValidationError, InvalidDataError, NotFoundError } from "../core/errors";
import { CreateUserType, UserFilter } from "../types/users";
import { getRandomItem } from "../core/utils/list";

class UserService {
  private validate(user: CreateUserType | User) {
    if (user.name == null) {
      throw new ValidationError("name is required");
    }

    if (user.birthDate == null) {
      throw new ValidationError("birthDate is required");
    }

    if (user.avatar == null) {
      throw new ValidationError("birthDate is required");
    }
  }

  async login(): Promise<User | null> {
    const users = await UserModel.find(
      {
        deleted: false,
      },
      "-password"
    )
      .lean()
      .exec();

    return getRandomItem(users);
  }

  async createUser(user: CreateUserType): Promise<User> {
    this.validate(user);

    const foundUser = await UserModel.findOne({
      name: user.name,
    })
      .lean()
      .exec();

    if (foundUser != null) {
      throw new InvalidDataError(`User '${user.name}' existed`);
    }

    const createdUser = await UserModel.create({
      ...user,
      _id: Types.ObjectId(),
      createDate: new Date(),
      editDate: new Date(),
    });

    return createdUser;
  }

  async getAllUsers(filter?: UserFilter): Promise<User[]> {
    const query = UserModel.find(
      {
        deleted: false,
      },
      "-password"
    );

    if (filter?.notIds != null) {
      query.where("_id", { $nin: filter.notIds });
    }

    return query.lean().exec();
  }

  async getUser(userId: string): Promise<User | null> {
    const user = await UserModel.findOne({
      _id: userId,
      deleted: false,
    })
      .lean()
      .exec();

    return user;
  }

  async updateUser(user: User): Promise<User> {
    this.validate(user);

    const foundUser = await UserModel.findOne({
      _id: user._id,
    })
      .lean()
      .exec();

    if (foundUser == null) {
      throw new NotFoundError(`User ${user.name} not existed`);
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        ...foundUser,
        ...user,
        editDate: new Date(),
      },
      { new: true }
    )
      .lean()
      .exec();

    if (updatedUser == null) {
      throw new NotFoundError(`Updated User ${user._id} not existed`);
    }

    return updatedUser;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const user = await UserModel.findOne({
      _id: userId,
    })
      .lean()
      .exec();

    if (user == null) {
      throw new NotFoundError(`User ${userId} not existed`);
    }

    await UserModel.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        deleted: true,
        editDate: new Date(),
      }
    )
      .lean()
      .exec();

    return true;
  }
}

export default new UserService();
