import {pool} from "../db/db.js";

// 전체
export async function findAll() {
    let sql = "SELECT * FROM reservations";

    const [rows] = await pool.query(sql);
    return rows;
}

export async function findByFilter({
   reserveId,
   name,
   status,
   }) {

    const query = {
        sql: "SELECT * FROM reservations WHERE 1=1",
        params: []
    }

    function condition(obj, condition, value) {
        if (!value) return;

        obj.sql += ` AND ${condition}`;
        obj.params.push(value);
    }

    condition(query, "reserveId = ?", reserveId);
    condition(query, "status = ?", status);
    condition(query, "name LIKE ?", name && `%${name}%`);

    const [rows] = await pool.query(query.sql, query.params);
    return rows;
}

// PK id (상세조회, 추가, 수정, 삭제 전용)
export async function findById(id) {
    let sql = "SELECT * FROM reservations WHERE id = ?";
    const findReserve = [id];

    const [rows] = await pool.query(sql, findReserve);
    return rows[0] || null;
}

// 추가
export async function insert(reservation) {
    let sql = "INSERT INTO reservations (name, reserveId, startAt, endAt, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const params = [
        reservation.name,
        reservation.reserveId,
        reservation.startAt,
        reservation.endAt,
        reservation.status,
        reservation.createdAt,
        reservation.updatedAt,
    ];

    await pool.query(sql, params)
}

// 수정
// 수정이 가능한 항목은 이름과, 예약 시작 시간만 수정이 가능함.
export async function update(reservation) {
    let sql = "UPDATE reservations SET name=?, startAt=?, endAt=?, updatedAt=? WHERE id = ?"
    const params = [
        reservation.name,
        reservation.startAt,
        reservation.endAt,
        reservation.updatedAt,
        reservation.id
    ];

    await pool.query(sql, params);
}

// 상태 수정
export async function updateStatus(reservation) {
    let sql = "UPDATE reservations SET status=?, updatedAt=? WHERE id=?";
    const params = [
        reservation.status,
        reservation.updatedAt,
        reservation.id
    ];

    await pool.query(sql, params);
}

// 삭제
export async function remove(reservation) {
    let sql = "DELETE FROM reservations WHERE id = ?";
    const findReserve = [reservation.id];

    await pool.query(sql, findReserve);
}

// DB에서 날짜를 기준으로 찾기
export async function getReserveByAt(startAt, endAt) {
    let sql = "SELECT * FROM reservations WHERE startAt < ? AND endAt > ? LIMIT 1";
    const [rows] = await pool.query(sql, [endAt, startAt]);

    return rows.length > 0;
}
