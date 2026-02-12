import {validateData} from "./validateData.js";

async function validateUpdateBody (req, res, next) {
    const { name } = req.body;

    try {
        validateData("이름", name, 1);

        next();
    } catch (err) {
        next(err);
    }
}

export default validateUpdateBody;