import User from "@models/user.model";
import { IUser } from "@models/user.model";

export const register = async (data: IUser): Promise<IUser> => {
  return User.create(data);
};

export const findUserByIdService = async (
  userId: string,
): Promise<IUser | null> => {

  return User.findById(userId);
};