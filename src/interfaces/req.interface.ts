import { Request } from 'express';
import { IJwtPayload } from './jwt-payload.interface';

export type Req = Request & { auth: IJwtPayload };
