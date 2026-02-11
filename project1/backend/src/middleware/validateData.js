import status from "../data/status.js";
import validateDuplicate from "./validateDate.js";
import validateBusinessRules from "../business/validateBusinessRules.js";

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

function validateStatus(data) {
    const allowedStatus = status;

    if (!allowedStatus.includes(data))
        throw new Error("허용되지 않는 상태 속성입니다.");
}

function validateCreateBody (req, res, next) {
    const { name, status, startAt, endAt } = req.body;

    // validateData의 경우
    // "이름", "종류" 등등 다양한 항목 검증을 위해
    // field로 검증할 타입과 검증할 data, 기준글자 등을 매개변수로 받음.


    try {
        validateData("이름", name, 1);
        validateStatus(status);
        validateBusinessRules(startAt);
        await validateDuplicate(startAt, endAt);

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

export default validateCreateBody;