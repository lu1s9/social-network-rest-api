import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json(error.errors.map((issue) => issue.message));
        }
        return res.status(500).json({ message: 'internal server error' });
    }
};
