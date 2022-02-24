import { Router } from "express";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeDetails,
} from "../controllers/employeesController";
import { rolesList } from "../configs/rolesList";
import verifyRole from "../middlewares/verifyRole";
const router = Router();

router
  .route("/")
  .get(getEmployees)
  .post(addEmployee);

router
  .route("/:employeeId")
  .put(updateEmployee)
  .delete(deleteEmployee)
  .get(verifyRole(rolesList.admin, rolesList.editor), getEmployeeDetails);

export default router;
