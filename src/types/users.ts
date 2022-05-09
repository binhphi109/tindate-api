export type CreateUserType = {
  name: string;
  birthDate: Date;
  avatar: string;
};

export type CreateUserActionType = {
  userFromId: string;
  userToId: string;
};

export type UserFilter = {
  notIds: string[];
};

export type UserLikeReturn = {
  matched: boolean;
};
