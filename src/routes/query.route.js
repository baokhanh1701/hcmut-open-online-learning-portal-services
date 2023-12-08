import { Router } from "express";
import {
    queryDatabase,
    // createAdmin,
    // getAdminById,
    // updateAdminById,
    insertData
} from "../controllers/query.controller.js";

const router = Router();

router.post("/query-selector", queryDatabase);
router.post("/insert-data", insertData);

export default router;