import express from "express";
import c from "../controllers/controller.js"
import validateBody from "../middleware/validateData.js"
import {findReservation} from "../middleware/findData.js";

const router = express.Router();

// 전체 조회
router.get("/", c.getReserve);

// 예약번호, 이름을 통한 단건 조회
router.get("/:id", findReservation, c.getReserveById);

router.post("/", validateBody, c.addReserve);

router.put("/:id", findReservation, validateBody, c.updateReserve);

router.delete("/:id", findReservation, c.removeReserve);

export default router;



