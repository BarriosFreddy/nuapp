import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(400).send('authorization token is not valid');
      return;
    }
    if (!SECRET_KEY) throw new Error('Secret key has not been set');
    const [, token] = authorization.split(' ');
    const decodedData = jsonwebtoken.verify(token, SECRET_KEY);
    if (typeof decodedData !== 'string') {
      const { data } = decodedData;
      res.locals.infoUser = data;
    }
    next();
  } catch (e) {
    console.error(e);
    res.status(400).send('something went wrong');
  }
};

export default isAuthenticated;
