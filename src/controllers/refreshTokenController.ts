import User from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { TokenType } from "types/token.types";

const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const token: string = cookies.jwt;
  const foundRefreshToken = await User.findOne({ refreshToken: token }).exec();
  if (!foundRefreshToken) return res.sendStatus(403);
  jwt.verify(token, String(process.env.REFRESH_TOKEN), (err, decoded) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        userInfo: {
          email: (decoded as TokenType).userInfo.email,
          role: (decoded as TokenType).userInfo.role,
        },
      },
      String(process.env.ACCESS_TOKEN),
      {
        expiresIn: "30s",
      }
    );
    res.status(200).json({ accessToken });
  });
};

export { refreshToken };
