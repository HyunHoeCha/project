import reservationData from '../data/reservation.data.js'
import status from '../data/status.js';

function validateData(field, data, value) {
    if (typeof value === 'number' || value <= 0) {
        throw new Error("기준 자릿수는 1 이상이어야 합니다.");
    }
    switch (field) {
        case '이름':
            if (typeof data !== 'string' || data.trim().length === 0)
                throw new Error(`${field}은/는 필수로 기입하셔야 합니다.`);

            if (data.trim().length < value)
                throw new Error(`${field}은/는 ${value}글자 이상이어야 합니다.`);
            break;
        default:
            throw new Error("허용되지 않는 속성입니다.")
    }
}

// 중복 검증
// 겹침 조건
// exist.startAt < new.endAt and exist.endAt > new.startAt
// 기존의 시작시간보다 새예약의 종료시간이 작을 경우 exist.startAt > new.endAt
// 해당 조건은 기존의 시작 시간보다 이전의 시간에 예약한 경우

// 새예약의 시작시간보다 기존의 종료시간이 작을 경우 new.startAt > exist.endAt
// 해당 조건은 기존의 종료시간 이후의 시간에 예약한 경우

// 위의 두가지가 아닐 때 무조건 겹침이 발생.
function validateDuplicate(newStartAt, newEndAt) {
    const existData = reservationData;
    const isReserve = existData.some(e =>
        e.startAt < newEndAt &&
        e.endAt > newStartAt
    );

    if (isReserve) {
        throw new Error("이미 예약된 시간입니다.")
    }
}

// 당일 예약일 경우
function isToday(startAt, now) {
    return startOfDay(startAt).getTime() === startOfDay(now).getTime();
}

function startOfDay(day) {
    const date = new Date(day);
    date.setHours(0, 0, 0, 0);
    return date;
}

function validateBusinessRules(data) {
    const now = new Date();
    const today = isToday(data, now);

    if (today && data <= now) throw new Error("현재 시간보다 전에 예약할 수 없습니다.");
}

function validateStatus(data) {
    const allowedStatus = status;

    if (!allowedStatus.includes(data))
        throw new Error("허용되지 않는 상태 속성입니다.");
}

function validateBody (req, res, next) {
    const { name, startAt, endAt, status } = req.body;

    // validateData의 경우
    // "이름", "종류" 등등 다양한 항목 검증을 위해
    // field로 검증할 타입과 검증할 data, 기준글자 등을 매개변수로 받음.


    try {
        validateData("이름", name, 1);
        validateBusinessRules(startAt);
        validateDuplicate(startAt, endAt);
        validateStatus(status);

        next();
    } catch (err) {
        return res.status(400).json({
            error: {
                "code": err.message.includes("이미 예약된")?
                    "DUPLICATE_ERROR":"VALIDATION_ERROR",
                "message": err.message,
            }
        })
    }
}

export default validateBody;