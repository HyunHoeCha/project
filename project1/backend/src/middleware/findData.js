import reservationData from '../data/reservation.data.js'
import status from '../data/status.js';

export function findReservation(req, res, next) {
    const id = parseInt(req.params.id);
    const name = req.query.name;
    const datas = reservationData;

    // id 전달 X
    if (!Number.isInteger(id))
        return res.status(400).json({
            error: {
                "code": "VALIDATION_ERROR",
                "message": "ID 오류"
            }
        });

    const filter = {
        reserveId: id,
        name: name || null,
    }
    const data = datas.find(d => matchFilter(d, filter));

    if (!data)
        return res.status(404).json({
            error: {
                "code": "VALIDATION_ERROR",
                "message": "예약 내역 없음"
            }
        })

    res.data = data;
    next();
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