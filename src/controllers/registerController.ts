import User from "../models/User";
import { Request, Response } from "express";
import { UserType } from "../types/user.types";
import { RequestType } from "../types/customReqRes.types";
import bcrypt from "bcrypt";

const registerUser = async (req: RequestType<UserType>, res: Response) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ message: "Email or password is required!!" });
  try {
    const foundUser = await User.findOne({ email }).exec();
    if (foundUser)
      return res
        .status(409)
        .json({ message: "This email is already in used!!" });
    const hashPasssword = await bcrypt.hash(password, 10);
    const handleRegister = await User.create({ email, password: hashPasssword });
    res.status(201).json({ data: handleRegister, status: 201 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};


export { registerUser };
