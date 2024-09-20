import { Request } from 'express';

export interface RequestType extends Request {
  userDetails?: any; 
}
