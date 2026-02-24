// 오로지 매개변수로 id 혹은 name, status만 받아서 빈 데이터인지만 검사 하는 로직
import {
    insert,
    update,
    remove,
    findAll,
    findById,
    updateStatus,
    findByFilter,
} from "../storage/reservation.storage.js";
import { reserveId } from "../utils/idGenerator.js";
import {MySQLDateTime} from "../utils/MySQLDateTime.js";

const initialStatus = "STANDBY";
const now = new Date().toISOString();

// 전체 목록 조회
export async function getAllReservations() {
    return await findAll();
}

export async function getReservationByFilter(filter) {
    const data = await findByFilter(filter);
    return data ?? null;
}

// PK로만 조회(상세조회, 추가, 수정, 삭제 전용)
export async function getReservationById({id}) {
    const data = await findById(id);
    return data ?? null;
}

// 추가
export async function createReservation(body) {
    console.log("createReservation called", new Date().toISOString());

    const newReserve = {
        ...body,
        startAt: MySQLDateTime(body.startAt),
        endAt: MySQLDateTime(body.endAt),
        reserveId: reserveId(),
        status: initialStatus,
        createdAt: MySQLDateTime(now),
        updatedAt: MySQLDateTime(now),
    }

    await insert(newReserve);
    return newReserve;
}

// 수정
export async function updateReservation(body) {
    const exist = await getReservationById({id: body.id});

    if (!exist) {
        const err = new Error("예약 내역이 없습니다.");
        err.status = 404;
        throw err;
    }

    if (!exist.status.includes(initialStatus)) {
        const err = new Error("예약이 대기중이 아닙니다.");
        err.status = 404;
        throw err;
    }

    const updated = {
        ...exist,
        ...body,
        startAt: MySQLDateTime(body.startAt),
        endAt: MySQLDateTime(body.endAt),
        updatedAt: MySQLDateTime(now),
    }

    await update(updated);
    return updated;
}

// 상태 수정
export async function updateReservationStatus(id, status) {
    const exist = await getReservationById({id});

    if (!exist) {
        const err = new Error("예약 내역이 없습니다.");
        err.status = 404;
        throw err;
    }

    const updated = {...exist, status, updatedAt: MySQLDateTime(now)}

    await updateStatus(updated);
    return updated;
}


// 삭제 (찾기 + 삭제 후 다시 찾기)
export async function removeReservation(id) {
    const exist = await getReservationById(id);

    if (!exist) {
        const err = new Error("예약 내역이 없습니다.");
        err.status = 404;
        throw err;
    }

    if (!exist.status.includes(initialStatus)) {
        const err = new Error("예약이 대기중이 아닙니다.");
        err.status = 404;
        throw err;
    }

    await remove(exist);
    const result = await getReservationById(exist);

    if (result) {
        const err = new Error("예약 삭제 실패");
        err.status = 404;
        throw err;
    }

    return {"message": "예약 삭제 완료"};
}