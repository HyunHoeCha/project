import {validateData} from "./validateData.js";

async function validateCreateBody (req, res, next) {
    const { name } = req.body;

    console.log("headers: ", req.headers);
    console.log("body: ", req.body);

    // validateData의 경우
    // "이름", "종류" 등등 다양한 항목 검증을 위해
    // field로 검증할 타입과 검증할 storage, 기준글자 등을 매개변수로 받음.


    try {
        validateData("이름", name, 1);

        next();
    } catch (err) {
        next(err);
    }
}

export default validateCreateBody;