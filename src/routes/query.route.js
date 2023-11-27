import { Router } from "express";
import {
    queryDatabase
    // createAdmin,
    // getAdminById,
    // updateAdminById
} from "../controllers/query.controller.js";

const queryRouter = Router();

queryRouter.post("", queryDatabase);

export default queryRouter;