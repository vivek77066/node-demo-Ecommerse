
import { findUserByIdService } from "../service/auth.service";
import {
  getUsers as getUserService,
  deleteUser as deleteUserService,
  updateUser as updateUserService,
} from "../service/user.service";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await getUserService();
  res.status(200).send({
    success: true,
    data: users,
  });
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.params.id as string;
  const deleteUser = await deleteUserService(userId);
  res.status(200).send({
    success: true,
    data: deleteUser,
  });
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.params.id as string;
    const { name, email, age, phone, address } = req.body
    
   const updatedData={name:name,email:email, age:age,phone:phone,address:address}

  const newUser = await updateUserService(userId, updatedData);
  res.status(200).send({
    success: true,
    data: newUser,
  });
};



export const replaceUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.params.id as string;

  const { name, email, age, phone, address } = req.body;

  const user = await findUserByIdService(userId);

  if (!user) {
    res.status(404).send({
      success: false,
      message: "User not found",
    });
    return;
  }

  user.name = name;
  user.email = email;
  user.age = age;
  user.phone = phone;
  user.address = address;

  await user.save();

  res.status(200).send({
    success: true,
    data: user,
  });
};