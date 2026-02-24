import {ParamsProps, ReservationDetailResponse} from "@/types/Data";
import RemoveClient from "@/hooks/RemoveClient/RemoveClient"

export default async function RemoveModal({params}: ParamsProps) {
    const {id} = await params;

    try {
        const res = await fetch(`http://localhost:3000/api/reservations/${id}`, {cache: "no-store"});
        if (!res.ok) throw new Error("Error Fetch");
        console.log(res.status, res.text)
        const result: ReservationDetailResponse = await res.json();
    } catch (e) {
        console.log(e.message);
    }

    return (
        <RemoveClient result={result.data} />
    )
}