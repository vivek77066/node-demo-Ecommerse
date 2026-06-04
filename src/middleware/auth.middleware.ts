import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({
          success: false,
          message: "No token provided",
        });

        return;
    }
    
    try {
        const decode = jwt.verify(token, process.env.ACCESS_SECRATE!);
       
       (req as any).user = decode;
      next();
    } catch {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });

      return;
    }
    
}

