import {ReservationListResponse} from "@/types/Data";
import List from "@/hooks/List/List"

type Params = {
    searchParams: Promise<{
        id?: string;
        name?: string;
        status?: string;
    }>
}

export default async function Page({searchParams} : Params) {
    const query = new URLSearchParams(await searchParams);
    const res = await fetch(`http://localhost:3000/api/reservations?${query}`, {cache: "no-store"});

    const result:ReservationListResponse = await res.json();

    return <List data={result.data ?? []} />;
}