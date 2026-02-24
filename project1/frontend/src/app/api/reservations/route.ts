import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const SEARCHURL = searchParams.toString() ?
        `http://localhost:3001/reservations?${searchParams}`
        : `http://localhost:3001/reservations`;

    try {
        const res = await fetch(SEARCHURL);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error("FETCH ERROR:", err);
    }
}