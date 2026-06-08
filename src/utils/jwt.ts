import jwt from "jsonwebtoken";
import { IUser } from "@models/user.model";

export const generateAccessToken = (user: IUser): string => {
  console.log(
    "inside the ",
    process.env.ACCESS_EXPIRY,
    process.env.ACCESS_SECRATE,
  );
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
  console.log(process.env.REFRESH_SECRATE);
  console.log(process.env.REFRESH_EXPIRY);
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
