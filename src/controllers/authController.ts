import User from "../models/User";
import { Response } from "express";
import { RequestType } from "../types/customReqRes.types";
import { UserType } from "../types/user.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req: RequestType<UserType>, res: Response) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ message: "Email or password is required!" });
  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(401).json({ message: "unauthorized" });
    const comparePassword = await bcrypt.compare(password, foundUser!.password);
    if (!comparePassword) return res.status(401).json({ message: "unauthorized" });
    const role: number[] = Object.values(foundUser!.role);
    const accessToken = jwt.sign(
      {
        userInfo: {
          email: foundUser!.email,
          role,
        },
      },
      String(process.env.ACCESS_TOKEN),
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      {
        userInfo: {
          email: foundUser!.email,
          role,
        },
      },
      String(process.env.REFRESH_TOKEN),
      {
        expiresIn: "1d",
      }
    );
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

export { loginUser };
