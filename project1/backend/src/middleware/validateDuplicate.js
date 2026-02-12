import {getReserveByAt} from "../storage/reservation.storage.js";
import {addMinutes} from "../utils/addMinutes.js";
import {UTCConversion} from "../utils/UTCConversion.js";

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

// endAt 시간 보정
export async function buildEndAt(req, res, next) {
    const { startAt } = req.body;

    if (!startAt) {
        return res.status(400).json({
            error: {
                code: "NOT_FOUND",
                message: "시작 시간이 지정되지 않았습니다.",
            }
        })
    }
    const start = new Date(startAt);
    const end = addMinutes(start, 30);

    req.body.startAt = start.toISOString();
    req.body.endAt = end.toISOString();

    next();
}

// 날짜 중복 검증
export async function validateDuplicate (req, res, next) {
    const startAt = req.body.startAt;
    const endAt = req.body.endAt;

    console.log("CHECK startAt:", startAt, "endAt:", endAt);

    try{
        const exists = await getReserveByAt(startAt, endAt);
        if (exists) {
            return res.status(400).json({
                error: {
                    code: "DUPLICATE_ERROR",
                    message: "이미 예약된 시간입니다.",
                }
            })
        }

        next();
    } catch (err) {
        return res.status(404).json({
            error: {
                code: "NOT_FOUND",
                message: err.message,
            }
        })
    }
}