import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import StudentModel from '../models/studentModels';
import { RequestType } from '../types/customTypes';
 
export const authUser = async (req: RequestType, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Auth token is required" });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    // Verify the token and cast it to the custom DecodedToken type
    const decodedToken : any = jwt.verify(token, process.env.JWT_TOKEN as string) ;

    const { _id } = decodedToken;

    if (!_id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Check if the student exists in the database
    const userDetails : any = await StudentModel.findById(_id);
    if (!userDetails) {
      return res.status(401).json({ error: `Student ID not found` });
    }

    // Attach user details to the request object and proceed to the next middleware
    req.userDetails = userDetails;
    console.log('middleware', req.userDetails)
    next();
  } catch (err) {
    res.status(401).json({ error: 'Request is not authorized' });
  }
};
