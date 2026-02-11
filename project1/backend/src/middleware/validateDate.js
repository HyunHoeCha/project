import reservationData from '../data/reservation.data.js'
import {existsDate} from "./findData.js";

// 중복 검증
// 겹침 조건
// exist.startAt < new.endAt and exist.endAt > new.startAt
// 기존의 시작시간보다 새예약의 종료시간이 작을 경우 exist.startAt > new.endAt
// 해당 조건은 기존의 시작 시간보다 이전의 시간에 예약한 경우

// 새예약의 시작시간보다 기존의 종료시간이 작을 경우 new.startAt > exist.endAt
// 해당 조건은 기존의 종료시간 이후의 시간에 예약한 경우

// 위의 두가지가 아닐 때 무조건 겹침이 발생.
// function validateDuplicate(newStartAt, newEndAt) {
//     const existData = findReservation
//     const isReserve = existData.some(e =>
//         e.startAt < newEndAt &&
//         e.endAt > newStartAt
//     );
//
//     if (isReserve) {
//         throw new Error("이미 예약된 시간입니다.")
//     }
// }

async function validateDuplicate (req, res, next) {
    const { startAt, endAt } = req.body;

    try{
        const exists = await existsDate(startAt, endAt);
        if (exists) return res.status(400).json({
            error: {
                "code": "DUPLICATE_ERROR",
                "message": "이미 예약된 시간입니다.",
            }
        })

        next();
    } catch (e) {
        return res.status(404).json({
            error: {
                "code": "NOT_FOUND",
                "message": e.message,
            }
        })
    }
}

export default validateDuplicate;