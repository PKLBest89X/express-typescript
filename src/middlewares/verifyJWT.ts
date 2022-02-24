import { RequestType } from '../types/customReqRes.types';
import { UserType } from '../types/user.types';
import { Response, NextFunction } from 'express';
import { TokenType } from '../types/token.types';
import jwt from 'jsonwebtoken';

const verifyToken = (req: RequestType<UserType>, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, String(process.env.ACCESS_TOKEN), (err, decoded) => {
        if (err) return res.sendStatus(403); // invalid token or forbidden;
        req.email = (decoded as TokenType).userInfo.email;
        req.role = (decoded as TokenType).userInfo.role
        next();
    })
}

export default verifyToken;