import { Request, Response } from "express";
import { EmployeeType } from "../types/employees.type";
import { RequestType, RequestTypes } from "../types/customReqRes.types";
import Employees from "../models/Employee";
import bcrypt from "bcrypt";
import { TestType } from "../types/customReqRes.types";

// // test with react

// import ReactUser from "../models/ReactUser";
// import { ReactUserType } from "types/reactUser.types";

// < ---------------------- GET ALL EMPLOYEES ------------------->

const getEmployees = async (req: Request, res: Response) => {
  try {
    const getEmployees = await Employees.aggregate([{$project: { "name": 1, "surname": 1, "email": 1, "password": 1 }}]).exec();
    res.status(200).json(getEmployees);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// < ---------------------- ADD EMPLOYEE ------------------->
const addEmployee = async (req: RequestType<EmployeeType>, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username or password is required!" });
  try {
    const foundUser = await Employees.findOne({ username }).exec();
    if (foundUser)
      return res
        .status(409)
        .json({ message: "This username is already in used!" }); // ຂໍ້ມູນຊ້ຳກັນ
    const hashPassword: string = await bcrypt.hash(password, 10);
    const addEmployee = await Employees.create({
      username: username,
      password: hashPassword,
    });
    res.status(201).json(addEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }

  // // test with react

  // const { name, surname, email, password } = req.body;
  // if (!(name && surname && email && password))
  //   return res
  //     .status(400)
  //     .json({ message: "Username or password is required!" });
  // try {
  //   const foundUser = await ReactUser.findOne({ email }).exec();
  //   if (foundUser)
  //     return res
  //       .status(409)
  //       .json({ message: "This username is already in used!" }); // ຂໍ້ມູນຊ້ຳກັນ
  //   const hashPassword: string = await bcrypt.hash(password, 10);
  //   const addEmployee = await ReactUser.create({
  //     name,
  //     surname,
  //     email,
  //     password: hashPassword,
  //   });
  //   res.status(201).json(addEmployee);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: err });
  // }
};

// < ---------------------- UPDATE EMPLOYEE ------------------->

const updateEmployee = async (
  req: RequestTypes<{ employeeId: string }, EmployeeType>,
  res: Response
) => {
  const employeeId = req.params.employeeId;
  const { username, password } = req.body;
  if (!(employeeId && username && password))
    return res
      .status(400)
      .json({ message: "ID or username or password is required" });
  try {
    const checkEmployee = await Employees.findById(employeeId).exec();
    if (!checkEmployee)
      return res
        .status(206)
        .json({ message: "No match employees with this ID" });
    const checkNewUsername = await Employees.findOne({ username }).exec();
    if (checkNewUsername)
      return res
        .status(409)
        .json({ message: "This username is already in used!" });
    const hashPassword = await bcrypt.hash(password, 10);
    await Employees.findByIdAndUpdate(employeeId, {
      $set: { username, password: hashPassword },
    });
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }

  // // test with react
  // const employeeId = req.params.employeeId;
  // const { name, surname, password } = req.body;
  // if (!(employeeId && name && surname && password))
  //   return res
  //     .status(400)
  //     .json({ message: "ID or username or password is required" });
  // try {
  //   const checkEmployee = await ReactUser.findOne({ email: employeeId }).exec();
  //   if (!checkEmployee)
  //     return res
  //       .status(206)
  //       .json({ message: "No match employees with this ID" });
  //   const hashPassword = await bcrypt.hash(password, 10);
  //   const updateUser = await ReactUser.updateOne(
  //     { email: employeeId },
  //     {
  //       $set: { name, surname, password: hashPassword },
  //     }
  //   );
  //   res.status(201).json(updateUser);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: err });
  // }
};

// < ---------------------- DELETE EMPLOYEE ------------------->

const deleteEmployee = async (
  req: Request<{ employeeId: string }>,
  res: Response
) => {
  try {
    const { employeeId } = req.params;
    const checkWithId = await Employees.findOne({ email: employeeId }).exec();
    if (!(employeeId && checkWithId))
      return res.status(400).json({ message: "No match or ID is required!!" });
    await Employees.deleteOne({ email: employeeId });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

// < ---------------------- GET EMPLOYEE DETAILS ------------------->

const getEmployeeDetails = async (
  req: Request<{ employeeId: string }>,
  res: Response
) => {
  try {
    const { employeeId } = req.params;
    const checkWithId = await Employees.findById(employeeId).exec();
    if (!(employeeId && checkWithId))
      return res.status(400).json({ message: "No match or ID is required!!" });
    res.status(200).json(checkWithId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

// < ---------------------- ທົດສອບການບວກພວກຂອງທີ່ມີ id ຄືກັນຫຼາຍຕົວແລ້ວລວມ qty ເຂົ້າກັນດ້ວຍ reduce ------------------->

const productDetails: TestType[] = [
  {
    proId: "s001",
    proName: "pepsi",
    proQty: 4,
    proPrice: 5000,
  },
  {
    proId: "s002",
    proName: "lay",
    proQty: 2,
    proPrice: 6000,
  },
  {
    proId: "s004",
    proName: "testo",
    proQty: 1,
    proPrice: 5000,
  },
];

const newProducts: TestType[] = [
  {
    proId: "s002",
    proName: "lay",
    proQty: 3,
    proPrice: 6000,
  },
  {
    proId: "s003",
    proName: "coca cola",
    proQty: 3,
    proPrice: 5000,
  },
  {
    proId: "s004",
    proName: "testo",
    proQty: 4,
    proPrice: 5000,
  },
];

// const testFunction = <T extends TestType>(
//   currentProduct: T[],
//   newProduct: T[]
// ): T[] => {
//   const unionArray = currentProduct.concat(newProduct);
//   const calculateArray = unionArray
//     .reduce((arr, items) => {
//       let foundSameItems = arr.find((same) => same.proId === items.proId);
//       if (foundSameItems) {
//         foundSameItems.proQty += items.proQty;
//         return arr;
//       }
//       arr.push(items);
//       return arr;
//     }, [] as T[])
//     .sort((a, b) => (a.proQty - b.proQty) * -1);
//   return calculateArray;
// };

// const showDetails = testFunction(productDetails, newProducts);
// console.log(showDetails);

export {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeDetails,
};
