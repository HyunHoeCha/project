const SERVER_URL: string = "http://localhost:3001/reservations";

export async function getAll() {
    const res = await fetch(SERVER_URL);
    if (!res.ok) {throw new Error("예약 목록 불러오기 실패");}
    const data = await res.json();
    return data;
}