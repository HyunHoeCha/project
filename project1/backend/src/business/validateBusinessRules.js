function validateBusinessRules(data) {
    const now = new Date();
    const today = isToday(data, now);

    if (today && data <= now) throw new Error("현재 시간보다 전에 예약할 수 없습니다.");
}

function isToday(startAt, now) {
    return startOfDay(startAt).getTime() === startOfDay(now).getTime();
}

function startOfDay(day) {
    const date = new Date(day);
    date.setHours(0, 0, 0, 0);
    return date;
}

function validateBusinessBody (req, res, next) {
    const { startAt } = req.body;

    // validateData의 경우
    // "이름", "종류" 등등 다양한 항목 검증을 위해
    // field로 검증할 타입과 검증할 data, 기준글자 등을 매개변수로 받음.

    try {
        validateBusinessRules(startAt);

        next();
    } catch (err) {
        return res.status(400).json({
            error: {
                "code": "VALIDATION_ERROR",
                "message": err.message,
            }
        })
    }
}

export default validateBusinessBody;