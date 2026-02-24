import {ParamsProps, ReservationDetailResponse} from "@/types/Data";
import {KSTConversion} from "@/utils/KSTConversion";

export default async function page({params}: ParamsProps) {
    const { id } = await params;

    const res = await fetch(`http://localhost:3000/api/reservations/${id}`, {cache: "no-store"});
    if (!res.ok) throw new Error("Error Fetch");
    const result:ReservationDetailResponse = await res.json();

    return (
        <>
            <h3>삭제 확인</h3>

            <ul key={result.data.id}>
                <li>예약 번호 : {result.data.reserveId}</li>
                <li>예약자 성함 : {result.data.name}</li>
                <li>예약 시작일 : {KSTConversion(result.data.startAt)}</li>
            </ul>
        </>
    )
}