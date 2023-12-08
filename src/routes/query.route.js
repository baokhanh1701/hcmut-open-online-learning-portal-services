import { Router } from "express";
import {
    queryDatabase,
    // createAdmin,
    // getAdminById,
    // updateAdminById,    
    insertData,
    deleteData,
    updateData,  
    dropTable
} from "../controllers/query.controller.js";

const router = Router();

router.post("/query-selector", queryDatabase);
router.post("/insert-data", insertData);
router.put("/update-data", updateData);
router.delete("/delete-data", deleteData);

router.delete("/drop-table", dropTable);

export default router;