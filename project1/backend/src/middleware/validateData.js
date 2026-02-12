// 필드 검증 요소

// 이름 검증
export function validateData(field, data, value) {
    if (typeof value !== 'number' || value <= 0) {
        const err =  new Error("기준 자릿수는 1 이상이어야 합니다.");
        err.status = 400;
        throw err;
    }

    let err = null;

    switch (field) {
        case '이름':
            if (typeof data !== 'string' || data.trim().length === 0) {
                err = new Error(`${field}은/는 필수로 기입하셔야 합니다.`);
                err.status = 400;
                throw err;
            }

            if (data.trim().length < value) {
                err = new Error(`${field}은/는 ${value}글자 이상이어야 합니다.`);
                err.status = 400;
                throw err;
            }
            break;

        default: {
            err = new Error("허용되지 않는 상태 속성입니다.");
            err.status = 400;
            throw err;
        }
    }
}