import jwt from 'jsonwebtoken';

const createToken = (_id: string | number) => {
  const secret = process.env.JWT_TOKEN as string;

  return jwt.sign({ _id }, secret, {
    expiresIn: '1d',
  });
};

export default createToken;
