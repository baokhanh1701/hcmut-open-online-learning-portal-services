import { Router } from "express";
import {
    getAllLecturers,
    createLecturer,
    getLecturerById,
    updateLecturerById
} from "../controllers/lecturer.controller.js";

const lecturerRouter = Router();

lecturerRouter.post("/get-all-lecturers", getAllLecturers);
lecturerRouter.post("/create", createLecturer);
lecturerRouter.post("/view/:id", getLecturerById);
lecturerRouter.post("/update/:id", updateLecturerById);

export default lecturerRouter;