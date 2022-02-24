import User from "../models/User";
import { Request, Response } from "express";

const logoutUser = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content to send back;
  const token: string = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken: token }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
    });
    res.sendStatus(204);
  }
  foundUser!.refreshToken = "";
  const logout = await foundUser!.save();
  res.clearCookie("jwt", {
    httpOnly: true,
  });
  res.sendStatus(204);
};

export { logoutUser };
