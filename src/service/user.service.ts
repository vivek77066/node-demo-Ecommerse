import User from "../model/user.model";
import { IUser } from "../model/user.model";
import { UpdateUserDTO } from "../validators/user.validation";

export const getUsers = async (): Promise<IUser[]> => {
    return User.find();
}

export const updateUser = async (
  userId: string,
  projection: UpdateUserDTO = {},
  options = { new: true },
): Promise<UpdateUserDTO | null> => {
  console.log("projection", projection);
  return User.findByIdAndUpdate(userId, projection, options);
};

export  const  deleteUser = async (userId:string): Promise<void|null> => {
    return User.findByIdAndDelete(userId);
}

export const findUser = async (filter = {}): Promise<IUser | null> => {
  return User.findOne(filter).select("+password");
};
