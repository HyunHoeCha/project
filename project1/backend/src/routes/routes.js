import express from "express";
import {getList, get, add, update, remove, updateStatus} from "../controllers/controller.js"
import validateCreateBody from "../middleware/validateCreateBody.js";
import validateUpdateBody from "../middleware/validateUpdateBody.js";
import {buildEndAt, validateDuplicate} from "../middleware/validateDuplicate.js";
import validateBusinessBody from "../business/validateBusinessBody.js";

const router = express.Router();

// 전체 조회
router.get("/", getList);

// 예약번호, 이름을 통한 단건 조회
router.get("/:id", get);

// 중복검사 먼저
router.post("/phase1", validateDuplicate, (req, res) => {
    res.json({ok: true});
})

// 추가
router.post("/", validateCreateBody, validateBusinessBody, buildEndAt, validateDuplicate, add);

// 수정
router.put("/:id", validateUpdateBody, validateBusinessBody, buildEndAt, validateDuplicate, update);

// 상태 변경
router.patch("/:id/status", updateStatus);

// 삭제
router.delete("/:id", remove);

export default router;



