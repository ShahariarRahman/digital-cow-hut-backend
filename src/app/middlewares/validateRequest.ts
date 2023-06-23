import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next(); // schema no error: return handler/(req,res,next..) to next handler
    } catch (error) {
      next(error); // error in schema. error sent to globalErrorHandler. not go to next handler
    }
  };

export default validateRequest;
