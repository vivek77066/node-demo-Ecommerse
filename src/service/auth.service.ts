import User from "../model/user.model";
import { IUser } from "../model/user.model";

export const register = async (data: IUser): Promise<IUser> => {
  return User.create(data);
};

export const findUserByIdService = async (
  userId: string,
): Promise<IUser | null> => {
  return User.findById(userId);
};