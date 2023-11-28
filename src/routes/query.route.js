import { Router } from "express";
import {
    queryDatabase
    // createAdmin,
    // getAdminById,
    // updateAdminById
} from "../controllers/query.controller.js";

const router = Router();

router.post("/query-selector", queryDatabase);

export default router;