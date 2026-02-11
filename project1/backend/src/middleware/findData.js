import reservationData from '../data/reservation.data.js'
import status from '../data/status.js';
import {reserveId} from "../utils/idGenerator.js";
import {pool} from "../data/db.js"

export async function findByIdName({reserveId, name}) {
    let sql = "SELECT * FROM reservations WHERE id = ?";
    const params = [reserveId];
    if (name) {
        sql += "AND name = ?";
        params.push(name);
    }

    const [rows] = await pool.query(sql, params);
    return rows[0] || null;
}

export async function existsDate(startAt, endAt) {
    const sql = "SELECT * FROM reservations WHERE startAt < ? AND endAt > ?";

    const [rows] = await pool.query(sql, [endAt, startAt])
    return rows.length > 0;
}

export async function findReservation(req, res, next) {
    const id = parseInt(req.params.id);
    const name = req.query.name;

    // id 전달 X
    if (!Number.isInteger(id))
        return res.status(400).json({
            error: {
                "code": "VALIDATION_ERROR",
                "message": "ID 오류"
            }
        });

    try {
        const datas = await findByIdName({
            reserveId: id,
            name: name || null,
        })

        if (!datas)
            return res.status(404).json({
                error: {
                    "code": "NOT_FOUND",
                    "message": "예약 내역 없음",
                }
            })

        const data = datas.find(d => matchFilter(d, datas));

        if (!data)
            return res.status(404).json({
                error: {
                    "code": "VALIDATION_ERROR",
                    "message": "예약 내역 없음"
                }
            })

        res.data = data;
        next();
    } catch (e) {
        next(e);
    }
}

export function findStatus (data) {
    if (typeof data !== 'string') return null;

    const valid = data.toUpperCase();
    if (status.includes(valid)) return true;

    return null;
}

export function matchFilter (data, filter) {
    for (const key in data) {
        if (data[key] === null ) continue;

        if (key === "search") {
            const result =
                `${data.reserveId}, ${data.name}, ${data.startAt}`
                    .toLowerCase();
            if (!result.includes(filter.search)) return false;
            continue;
        }
        if (data[key] !== filter[key]) return false;
    }
    return true;
}