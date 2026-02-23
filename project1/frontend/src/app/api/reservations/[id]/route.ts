import {NextResponse} from "next/server";
type Params = {
    params: Promise<{
        id: string;
    }>
}

export async function GET(
    req: Request,
    { params }: Params
) {
    const { id } = await params;
    console.log("API ID Log: ", id);

    const res = await fetch(`http://localhost:3001/reservations/${id}`);

    if (!res.ok) return NextResponse.json(
        {message: "예약 내역이 없습니다."},
        {status: 404}
    );

    const reserve = await res.json();

    return NextResponse.json(reserve, {status: 200});
}