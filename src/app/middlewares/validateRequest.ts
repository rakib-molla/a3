/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: {
          name: err.name || err,
          message: err.message || err,
          details: err.errors || err,
        },
      });
    }
  };
};

export default validateRequest;
