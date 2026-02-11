import reservationData from '../data/reservation.data.js'
import { findStatus, matchFilter } from "../middleware/findData.js";
import { nextId, reserveId } from '../utils/idGenerator.js';
// 비즈니스 로직

// 목록 조회
function getReserve (req, res) {
    const filter = {
        search: (req.query.reserve ?? "").toLowerCase() || null,
        status: req.query.allow ? findStatus(req.query.allow) : null,
    }

    let result = reservationData
        .filter(r => matchFilter(r, filter));

    res.json({total: result.length, data: result});
}

function getReserveById (req, res) {
    return res.json({data: req.data});
}

function addReserve (req, res) {
    const now = new Date().toISOString();
    const initialStatus = "STANDBY";

    const newReserve = {
        id: nextId(reservationData),
        ...req.body,
        reserveId: reserveId(),
        status: initialStatus,
        createdAt: now,
        updatedAt: now,
    }

    reservationData.push(newReserve);
    res.status(201).json(newReserve);
}

function updateReserve (req, res) {
    const data = req.body;
    const now = new Date().toISOString();

    for (const key in data) {
        if (!reservationData[key].status.includes("STANDBY")) {
            return res.status(404).json({
                "message": "예약 수정 실패"
            })
        }
        reservationData[key] = data[key];
    }

    data.updatedAt = now;
    res.json({data: data});
}

function removeReserve (req, res) {
    const data = req.body;
    const before = reservationData.length;

    if (!data.status.includes("STANDBY"))
        return res.status(409).json({
            "message": "예약이 대기중이 아닙니다."
        });

    const result = reservationData
        .splice(reservationData.indexOf(data), 1);

    if (result.length === before)
        res.status(404).json({
            "message": "예약 삭제 실패"
        })

    res.json({"message": "예약 삭제 완료"});
}

export default {
    getReserve,
    getReserveById,
    addReserve,
    updateReserve,
    removeReserve,
}