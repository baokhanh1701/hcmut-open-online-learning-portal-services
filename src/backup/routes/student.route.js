import { Router } from "express";
import {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudentById
} from "../controllers/student.controller.js";

const studentRouter = Router();

studentRouter.post("/get-all-students", getAllStudents);
studentRouter.post("/create", createStudent);
studentRouter.post("/view/:id", getStudentById);
studentRouter.post("/update/:id", updateStudentById);

export default studentRouter;