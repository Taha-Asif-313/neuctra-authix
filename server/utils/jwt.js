import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
