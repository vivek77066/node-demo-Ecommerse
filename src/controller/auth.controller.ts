import {
  findUserByIdService,
  register as registerService,
} from "../service/auth.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { findUser } from "../service/user.service";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log(email, password);
  const filter = {
    email: email,
  };
  const user = await findUser(filter);
  if (!user) {
    res.status(500).send({
      success: false,
      message: "user not fount",
    });
    return;
  }
  console.log("=====")
  console.log(user, user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("isMatch", isMatch);
  if (!isMatch) {
    res.status(500).send({
      success: false,
      message: "something went wrong",
    });
    return;
  }

  const accesstoken = generateAccessToken(user);
  const refreshtoken = generateRefreshToken(user);

  res.status(200).send({
    success: true,
    data: user,
    accesstoken: accesstoken,
    refreshtoken: refreshtoken,
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;
  const filter = { email: data.email };
  const alreadyUser = await findUser(filter);
  if (alreadyUser) {
    res.status(500).send({
      success: false,
      message: "email already Present",
    });
    return;
  }
  const user = await registerService(data);
  res.status(201).send({
    success: true,
    data: user,
    message: "User create successfully",
  });
};

export const changePassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.params.userId as string;

  const user = await findUserByIdService(userId);

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    res.status(400).json({
      success: false,
      message: "Old password is incorrect",
    });
    return;
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};