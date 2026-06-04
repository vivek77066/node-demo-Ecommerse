import { NextFunction,Request,Response } from "express"
import { ZodSchema } from "zod"


export const validation = (schema:ZodSchema) => (req:Request,res:Response,next:NextFunction)=>{
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).send({
        success: false,
        errors: result.error.issues,
      });

      return;
    }

    req.body = result.data;
    next();
}

export default validation;