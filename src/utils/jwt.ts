import jwt from "jsonwebtoken";
import { IUser } from "../model/user.model";

export const generateAccessToken = (user: IUser): string => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_SECRATE!,
    {
      expiresIn: process.env.ACCESS_EXPIRY as jwt.SignOptions["expiresIn"],
    },
  );
};

export const generateRefreshToken = (user: IUser): string => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.REFRESH_SECRATE!,
    {
      expiresIn: process.env.REFRESH_EXPIRY as jwt.SignOptions["expiresIn"],
    },
  );
};
