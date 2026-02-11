import express from "express";
import c from "../controllers/controller.js"
import validateDateBody from "../middleware/validateDate.js"
import validateCreateBody from "../middleware/validateData.js";
import {findReservation} from "../middleware/findData.js";
import validateDuplicate from "../middleware/validateDate.js";

const router = express.Router();

// 전체 조회
router.get("/", c.getReserve);

// 예약번호, 이름을 통한 단건 조회
router.get("/:id", findReservation, c.getReserveById);

// 중복검사 먼저
router.post("/phase1", validateDuplicate, (req, res) => {
    res.json({ok: true});
})

// 추가
router.post("/", validateDateBody, validateCreateBody, c.addReserve);

// 수정
router.put("/:id", findReservation, validateDateBody, validateDataBody, c.updateReserve);

// 삭제
router.delete("/:id", findReservation, c.removeReserve);

export default router;



