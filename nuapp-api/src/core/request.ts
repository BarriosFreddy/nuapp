import { Request as ExpressRequest } from 'express';
import { UserDTO } from '../user-account/dtos/user.dto';

export interface Request extends ExpressRequest {
    user?: UserDTO;
}
