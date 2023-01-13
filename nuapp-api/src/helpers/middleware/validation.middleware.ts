import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

const validateBody = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      req.body = await schema.validateAsync(body);
      next();
    } catch (e) {
      console.error(e);
      res.status(422).send(e);
    }
  };
};

const validateParameters = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      req.params = await schema.validateAsync(params);
      next();
    } catch (e) {
      console.error(e);
      res.status(422).send(e);
    }
  };
};

export { validateBody, validateParameters };
