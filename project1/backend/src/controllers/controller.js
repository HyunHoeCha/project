import {
    getAllReservations,
    getReservation,
    createReservation,
    updateReservation,
    removeReservation,
    getReservationByStatus,
    updateReservationStatus, getReservationById,
} from "../services/reservation.service.js";
import fs from "fs";
// 오로지 req, res만 받고 service를 호출하여 결과를 전달하는 로직
// sql과 db X

// 전체 조회
export async function getList(req, res) {
    const data = await getAllReservations()
    if (data.length === 0) {
        return res.status(200).json({message: "예약 내역이 없습니다.", data: [] });
    }
    return res.json({data});
}

// 1건의 상세 조회
export async function getById(req, res) {
    const data = await getReservationById({
        id: Number(req.params.id),
    });

    if (!data) {
        return res.status(200).json({message: "예약 내역이 없습니다.", data: [] });
    }
    return res.json({data});
}

// 필터를 통한 단건 조회
export async function getFilter(req, res) {
    const filter = {
        search: (req.query.reserve ?? "").toLowerCase() || null,
        status: req.query.allow ? req.query.allow : null
    }

    let data = null;
    if (filter.search) {
        data = await getReservation({id: filter.search, name: filter.search});
        if (!data) {
            return res.status(200).json({message: "예약 내역이 없습니다.", data: null });
        }
        return res.json({data});
    }

    if (filter.status) {
        data = await getReservationByStatus(filter.status);
        if (!data) {
            return res.status(200).json({message: "대기중인 예약이 없습니다.", data: null });
        }
        return res.json({data});
    }

    return res.json({data});
}

// service쪽에서 throw를 했다면
// 여기선 따로 throw처리를 하지않고 return값으로 err 전달.
export async function add (req, res) {
    try{
        const data = await createReservation(req.body);
        // fs.writeFileSync("reservation.data.txt", JSON.stringify(data, null, 2), "utf8");
        return res.status(201).json({data});
    } catch (err) {
        const status = err.status || 500;
        return res.status(status).json({
            message: err.message
        });
    }
}

export async function update (req, res) {
    try {
        const data = await updateReservation(req.body);
        return res.status(200).json({data});
    } catch (err) {
        const status = err.status || 500;
        return res.status(status).json({
            message: err.message
        })
    }
}

export async function updateStatus (req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const data = await updateReservationStatus(id, status);
        console.log(id)
        console.log(status);
        console.log(data);
        return res.status(200).json({data});
    } catch (err) {
        const status = err.status || 500;
        return res.status(status).json({
            message: err.message
        })
    }
}

// status = 204인 경우 본문이 없어야함.
// 따라서 성공 메세지를 전달할려면 status = 200으로 되어야한다.
export async function remove (req, res) {
    const { id } = req.params;

    try {
        const msg = await removeReservation(id);
        return res.status(200).json({msg});
    } catch (err) {
        const status = err.status || 500;
        return res.status(status).json({
            message: err.message
        })
    }
}