import mongoose from "mongoose";
import { EmployeeType } from "../types/employees.type";
const { Schema } = mongoose;

const employeeSchema = new Schema<EmployeeType>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<EmployeeType>("Employees", employeeSchema);
