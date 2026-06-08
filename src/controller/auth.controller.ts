import {
  findUserByIdService,
  register as registerService,
} from "@services/auth.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { findUser } from "@services/user.service";
import { generateAccessToken, generateRefreshToken } from "@utils/jwt";
import jwt from "jsonwebtoken";
import User from "@models/user.model";

export const login = async (req: Request, res: Response): Promise<void> => {

  const { email, password } = req.body;
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
 
  const isMatch = await bcrypt.compare(password, user.password);
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


export const refreshTokenController = async (req: Request, res: Response) => {
  const {refreshToken} = req.body;
  

 if (!refreshToken) {
   res.status(401).json({
     success: false,
     message: "Refresh token required",
   });

   return;
  }
  
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRATE!) as {
    _id: string;
    email: string;
  };
const user = await User.findById(decoded._id);

if (!user) {
  res.status(404).json({
    success: false,
    message: "User not found",
  });

  return;
  }

   const accessToken = generateAccessToken(user);

   res.status(200).json({
     success: true,
     accessToken,
   });
  


}